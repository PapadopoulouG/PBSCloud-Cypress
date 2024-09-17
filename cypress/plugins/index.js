const sql = require('mssql');

module.exports = (on, config) => {
  on('task', {
    async deleteWorkDaysInDB() {
      const pool = new sql.ConnectionPool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT) || 1433,
        options: {
          encrypt: true,
          trustServerCertificate: true
        }
      });

      try {
        await pool.connect();
        await pool.request().query(`DELETE FROM WorkDays WHERE TaxPayerId='${process.env.TAXPAYER_ID}'`);
      } catch (error) {
        throw new Error(error);
      } finally {
        await pool.close();
      }
      return null;
    },

    async deleteWorkAreasInDB() {
      const pool = new sql.ConnectionPool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT) || 1433,
        options: {
          encrypt: true,
          trustServerCertificate: true
        }
      });

      try {
        await pool.connect();
        await pool.request().query(`DELETE FROM WorkAreas WHERE TaxPayerId='${process.env.TAXPAYER_ID}'`);
      } catch (error) {
        throw new Error(error);
      } finally {
        await pool.close();
      }
      return null;
    },

    async deleteEmployeesInDB() {
      const pool = new sql.ConnectionPool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT) || 1433,
        options: {
          encrypt: true,
          trustServerCertificate: true
        }
      });

      try {
        await pool.connect();
        await pool.request().query(`DELETE FROM Employees WHERE TaxPayerId='${process.env.TAXPAYER_ID}'`);
      } catch (error) {
        throw new Error(error);
      } finally {
        await pool.close();
      }
      return null;
    },

    async checkWorkAreasInDB() {
      const pool = new sql.ConnectionPool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT) || 1433,
        options: {
          encrypt: true,
          trustServerCertificate: true
        }
      });

      try {
        await pool.connect();
        const result = await pool.request().query(`
          SELECT COUNT(*) as count
          FROM WorkAreas
          WHERE TaxPayerId='${process.env.TAXPAYER_ID}'
        `);
        return result.recordset[0].count > 0;
      } catch (error) {
        throw new Error(error);
      } finally {
        await pool.close();
      }
    },

    async checkEmployeesInDB() {
      const pool = new sql.ConnectionPool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT) || 1433,
        options: {
          encrypt: true,
          trustServerCertificate: true
        }
      });

      try {
        await pool.connect();
        const result = await pool.request().query(`
          SELECT COUNT(*) as count
          FROM Employees
          WHERE TaxPayerId='${process.env.TAXPAYER_ID}'
        `);
        return result.recordset[0].count > 0;
      } catch (error) {
        throw new Error(error);
      } finally {
        await pool.close();
      }
    },

    async checkWorkDaysInDB() {
      const pool = new sql.ConnectionPool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT) || 1433,
        options: {
          encrypt: true,
          trustServerCertificate: true
        }
      });

      try {
        await pool.connect();
        const result = await pool.request().query(`
          SELECT COUNT(*) as count
          FROM WorkDays
          WHERE TaxPayerId='${process.env.TAXPAYER_ID}'
        `);
        return result.recordset[0].count > 0;
      } catch (error) {
        throw new Error(error);
      } finally {
        await pool.close();
      }
    }
  });
};
