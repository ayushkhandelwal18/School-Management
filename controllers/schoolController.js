const db = require('../config/db');
const calculateDistance = require('../utils/haversine');

exports.addSchool = async (req, res, next) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        const query = `
            INSERT INTO schools (name, address, latitude, longitude) 
            VALUES (?, ?, ?, ?)
        `;
        
        const [result] = await db.execute(query, [name, address, latitude, longitude]);

        res.status(201).json({
            success: true,
            message: 'School added successfully',
            data: {
                id: result.insertId,
                name,
                address,
                latitude,
                longitude
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.listSchools = async (req, res, next) => {
    try {
        const userLat = parseFloat(req.query.latitude);
        const userLon = parseFloat(req.query.longitude);

        const [schools] = await db.execute('SELECT * FROM schools');

        const schoolsWithDistance = schools.map(school => {
            const distance = calculateDistance(
                userLat,
                userLon,
                school.latitude,
                school.longitude
            );
            return {
                ...school,
                distance
            };
        });

        // Sort by distance (ascending)
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.status(200).json({
            success: true,
            message: 'Schools fetched successfully',
            data: schoolsWithDistance
        });
    } catch (error) {
        next(error);
    }
};
