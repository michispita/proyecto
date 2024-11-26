const getCats = async () => {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(
        "SELECT id, name, description, productCount, imgSrc FROM cats"
      );
  
      return rows;
    } catch (error) {
    } finally {
      if (conn) conn.release(); //release to pool
    }
    return false;
  };
  
  const getCatById = async (id) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(
        "SELECT id, name, description, productCount, imgSrc FROM cats id=?",
        [id]
      );
  
      return rows[0];
    } catch (error) {
      console.log(error);
    } finally {
      if (conn) conn.release(); //release to pool
    }
    return false;
  };
  
  const createCat = async (cat) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const response = await conn.query(
        `INSERT INTO cats(id, name, description, productCount, imgSrc) VALUE(?, ?, ?, ?, ?)`,
        [cat.id, cat.name, cat.description, cat.productCount, cat.imgSrc]
      );
  
      return { id: parseInt(response.insertId), ...cat };
    } catch (error) {
      console.log(error);
    } finally {
      if (conn) conn.release(); //release to pool
    }
    return false;
  };
  
  const updateCat = async (id, cat) => {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query(
        `UPDATE cat SET name=?, description=?, productCount=?, imgSrc=? WHERE id=?`,
        [cat.name, cat.description, cat.productCount, cat.imgSrc, id]
      );
  
      return { id, ...cat };
    } catch (error) {
      console.log(error);
    } finally {
      if (conn) conn.release(); //release to pool
    }
    return false;
  };
  
  const deleteCat = async (id) => {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query("DELETE FROM cats WHERE id=?", [id]);
  
      return true;
    } catch (error) {
      console.log(error);
    } finally {
      if (conn) conn.release(); //release to pool
    }
    return false;
  };
  
  module.exports = {
    getCats,
    getCatById,
    createCat,
    updateCat,
    deleteCat,
  };