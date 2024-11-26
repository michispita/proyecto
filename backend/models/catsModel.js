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
  
  const createUser = async (user) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const response = await conn.query(
        `INSERT INTO people(name, lastname, email) VALUE(?, ?, ?)`,
        [user.name, user.lastname, user.email]
      );
  
      return { id: parseInt(response.insertId), ...user };
    } catch (error) {
      console.log(error);
    } finally {
      if (conn) conn.release(); //release to pool
    }
    return false;
  };
  
  const updateUser = async (id, user) => {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query(
        `UPDATE people SET name=?, lastname=?, email=? WHERE id=?`,
        [user.name, user.lastname, user.email, id]
      );
  
      return { id, ...user };
    } catch (error) {
      console.log(error);
    } finally {
      if (conn) conn.release(); //release to pool
    }
    return false;
  };
  
  const deleteUser = async (id) => {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query("DELETE FROM people WHERE id=?", [id]);
  
      return true;
    } catch (error) {
      console.log(error);
    } finally {
      if (conn) conn.release(); //release to pool
    }
    return false;
  };
  
  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  };