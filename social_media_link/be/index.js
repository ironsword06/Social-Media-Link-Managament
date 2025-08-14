const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key'; 
const port = 3000;

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors({
    origin: 'http://localhost:4200', 
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    credentials: true
  }));

  app.options('*', cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'acd123456',
    database: 'smmanagement' 
});

connection.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
        return;
    }
    console.log('MySQL connected!');
});


function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token.' });
        }
        req.user = user;
        next();
    });
}

function authorizeRoles(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access denied. You do not have the required role.' });
        }
        next();
    };
}

function query(sql, params, callback) {
    connection.query(sql, params, (err, results) => {
        if (err) {
            return callback({ error: err.message });
        }
        callback(null, results);
    });
}

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Missing mandatory fields: username, email, password are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const isActive = 1;
        const role_id = 2;

        const sql = 'INSERT INTO Users (username, email, password, isActive, role_id) VALUES (?, ?, ?, ?, ?)';
        query(sql, [username, email, hashedPassword, isActive, role_id], (err, results) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(200).json({ message: 'User registered successfully.' });
        });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while registering the user.' });
    }
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Missing mandatory fields: email and password are required.' });
    }

    const sql = 'SELECT * FROM Users WHERE email = ?';
    query(sql, [email], async (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const user = results[0];

        if (user.isActive === 0) {
            return res.status(403).json({ error: 'Deleted account. Please contact support.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const token = jwt.sign({ id: user.id, role: user.role_id }, secretKey, { expiresIn: '1h' });
        res.json({ message: 'Login successful.', token });
    });
});


app.get('/get-social-links/:userId?', authenticateToken, (req, res) => {
    const userIdFromToken = req.user.id; 
    const roleId = req.user.role;
    const userId = req.params.userId ? parseInt(req.params.userId, 10) : userIdFromToken;  


    if (roleId !== 1 && userId !== userIdFromToken) {
        return res.status(403).json({ message: 'Unauthorized access. You cannot view other user\'s data.' });
    }

    let sql;
    let params = [];

    if (roleId === 1) {
        sql = `
            SELECT 
                SocialLinks.id, 
                SocialLinks.user_id, 
                Users.username AS username, 
                SocialLinks.social_media_name, 
                SocialLinks.social_media_link, 
                SocialLinks.description, 
                SocialLinks.isActive, 
                SocialLinks.updated_at
            FROM 
                SocialLinks
            JOIN 
                Users ON SocialLinks.user_id = Users.id
            WHERE 
                SocialLinks.isActive = 1
            ORDER BY 
                SocialLinks.user_id, 
                SocialLinks.updated_at DESC;
        `;
    } else {

        sql = 'SELECT id, user_id, social_media_name, social_media_link, description, isActive, updated_at FROM SocialLinks WHERE user_id = ? AND isActive = 1 ORDER BY updated_at DESC';
        params = [userId];
    }

    query(sql, params, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
});




app.post('/add-social-link', authenticateToken, (req, res) => {
    const { social_media_name, social_media_link, description } = req.body;

    if (!social_media_name || !social_media_link) {
        return res.status(400).json({ error: 'Missing mandatory fields: social_media_name and social_media_link are required.' });
    }

    const sql = 'INSERT INTO SocialLinks (user_id, social_media_name, social_media_link, description, updated_by_role_id, isActive) VALUES (?, ?, ?, ?, ?, ?)';
    query(sql, [req.user.id, social_media_name, social_media_link, description, req.user.role, 1], (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json({ id: results.insertId, message: 'Social link created successfully.' });
    });
});


app.put('/update-social-link/:id', authenticateToken, (req, res) => {
    const linkId = req.params.id;
    const { social_media_name, social_media_link, description } = req.body;
    const userId = req.user.id;
    const roleId = req.user.role;

    let sql;
    let params = [];

    if (roleId === 1) {
        sql = 'UPDATE SocialLinks SET social_media_name = ?, social_media_link = ?, description = ?, updated_by_role_id = ? WHERE id = ? AND isActive = 1';
        params = [social_media_name, social_media_link, description, roleId, linkId];
    } else {
        sql = 'UPDATE SocialLinks SET social_media_name = ?, social_media_link = ?, description = ?, updated_by_role_id = ? WHERE id = ? AND user_id = ? AND isActive = 1';
        params = [social_media_name, social_media_link, description, roleId, linkId, userId];
    }

    query(sql, params, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Link not found or not authorized to update.' });
        }

        res.json({ message: 'Social media link updated successfully.' });
    });
});



app.patch('/delete-social-link/:id/deactivate', authenticateToken, (req, res) => {
    const linkId = req.params.id;
    const userId = req.user.id;
    const roleId = req.user.role;

    let sql;
    let params = [];

    if (roleId === 1) {
        sql = 'UPDATE SocialLinks SET isActive = 0, updated_by_role_id = ? WHERE id = ?';
        params = [roleId, linkId];
    } else {
        sql = 'UPDATE SocialLinks SET isActive = 0, updated_by_role_id = ? WHERE id = ? AND user_id = ?';
        params = [roleId, linkId, userId];
    }

    query(sql, params, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Link not found or not authorized to deactivate.' });
        }

        res.json({ message: 'Social media link deactivated successfully.' });
    });
});

app.get('/get-user-info', authenticateToken, (req, res) => {
    const userId = req.query.userId || req.user.id;
    const sql = 'SELECT id, username, email, isActive, role_id FROM Users WHERE id = ? AND isActive = 1';
    const params = [userId];

    query(sql, params, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while fetching user info.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found or inactive.' });
        }

        const user = results[0];
        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            isActive: user.isActive,
            role_id: user.role_id
        });
    });
});

app.put('/update-user-info', authenticateToken, async (req, res) => {
    const { username, email, password } = req.body;
    const userId = req.user.id;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Missing mandatory fields: username, email, and password are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'UPDATE Users SET username = ?, email = ?, password = ? WHERE id = ? AND isActive = 1';
        query(sql, [username, email, hashedPassword, userId], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'User not found or inactive.' });
            }

            res.json({ message: 'User information updated successfully.' });
        });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while updating user information.' });
    }
});


app.put('/admin-update-user/:id', authenticateToken, authorizeRoles(1), (req, res) => {
    const userId = req.params.id;
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({ error: 'Missing mandatory fields: username and email are required.' });
    }

    const sql = 'UPDATE Users SET username = ?, email = ? WHERE id = ? AND isActive = 1';
    query(sql, [username, email, userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found or inactive.' });
        }

        res.json({ message: 'User updated successfully by admin.' });
    });
});


app.patch('/admin-deactivate-user/:id', authenticateToken, authorizeRoles(1), (req, res) => {
    const userId = req.params.id;

    const getUserRoleSql = 'SELECT role_id FROM Users WHERE id = ?';
    query(getUserRoleSql, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const userRole = results[0].role_id; 

        if (userRole === 1) {
            return res.status(403).json({ error: 'Admin user cannot be deactivated.' });
        }

        const deactivateUserSql = 'UPDATE Users SET isActive = 0 WHERE id = ?';
        query(deactivateUserSql, [userId], (err, results) => {
            if (err) {
                console.error('Error in deactivateUserSql:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'User not found.' });
            }

            const deactivateSocialLinksSql = 'UPDATE SocialLinks SET isActive = 0, updated_by_role_id = ? WHERE user_id = ?';
            query(deactivateSocialLinksSql, [userRole, userId], (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to update social links' });
                }

                res.json({ message: 'User and social links deactivated successfully.' });
            });
        });
    });
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

