<?php

class DBConnection {
  private $conn;

  /**
   * The server connection object.
   * Don't forget to close the connection.
   * @param string sql username
   * @param string sql password
   * @param string sql database name
   * @author Josh Grift
   */
  public function DBConnection($username, $password, $dbname) {
    $servername = "localhost";

    $this->$conn = new mysqli($servername, $username, $password, $dbname);

    if ($this->$conn->connect_error) {
        die("Connection failed: " . $this->$conn->connect_error);
    }
  }

  /**
   * send a query to the webserver
   * @param  string $queryString sql query string
   * @return array  the results of the query from sql
   */
  public function query($queryString){
    $result = mysqli_query($this->$conn,$queryString) or die(mysqli_error($this->$conn));
    $data_array = array();
    while ($row = mysqli_fetch_assoc($result)) {
      array_push($data_array,$row);
    }

    return $data_array;
  }

  /**
   * Close the connection
   */
  public function close(){
    $this->$conn->close();
  }
}

/* SAMPLE USAGE:

  $db = new DBConnection();
  echo $db->query("SELECT * FROM projects;")[0]['id'];
  $db->close();

*/
?>
