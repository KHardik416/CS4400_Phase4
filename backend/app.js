const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = 3030;

app.use(express.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }

  console.log("Connected to MySQL");
});

// Getting Views
app.get("/owner_view", (req, res) => {
  const query = "Select * from display_owner_view";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching data from the view");
    } else {
      res.json(results);
    }
  });
});

app.get("/employee_view", (req, res) => {
  const query = "Select * from display_employee_view";

  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching data from the view");
    } else {
      res.json(results);
    }
  });
});

app.get("/driver_view", (req, res) => {
  const query = "Select * from display_driver_view";

  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching data from the view");
    } else {
      res.json(results);
    }
  });
});

app.get("/location_view", (req, res) => {
  const query = "Select * from display_location_view";

  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching data from the view");
    } else {
      res.json(results);
    }
  });
});

app.get("/product_view", (req, res) => {
  const query = "Select * from display_product_view";

  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching data from the view");
    } else {
      res.json(results);
    }
  });
});

app.get("/service_view", (req, res) => {
  const query = "Select * from display_service_view";

  db.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching data from the view");
    } else {
      res.json(results);
    }
  });
});

// Adding to database
app.post("/add_owner", (req, res) => {
  const { ip_username, ip_first_name, ip_last_name, ip_address, ip_birthdate } =
    req.body;

  if (
    !ip_username ||
    !ip_first_name ||
    !ip_last_name ||
    !ip_address ||
    !ip_birthdate
  ) {
    return res.status(400).send("All fields are required");
  }

  const query = "Call add_owner(?, ?, ?, ?, ?)";
  const params = [
    ip_username,
    ip_first_name,
    ip_last_name,
    ip_address,
    ip_birthdate,
  ];

  db.query(query, params, (err, results) => {
    if (err) {
      console.log("Error executing prodecure: ", err);
      res.status(500).send("Error adding owner.");
    } else {
      res.status(200).send("Owner added successfully");
    }
  });
});

app.post("/add_employee", (req, res) => {
  console.log("Request Body:", req.body);
  const {
    ip_username,
    ip_first_name,
    ip_last_name,
    ip_address,
    ip_birthdate,
    ip_taxID,
    ip_hired,
    ip_employee_experience,
    ip_salary,
  } = req.body;

  if (
    !ip_username ||
    !ip_first_name ||
    !ip_last_name ||
    !ip_address ||
    !ip_birthdate ||
    !ip_taxID ||
    !ip_hired ||
    !ip_employee_experience ||
    !ip_salary
  ) {
    return res.status(400).send("All fields are required");
  }

  const query = "Call add_employee(?, ?, ?, ?, ?, ?, ?, ?, ?)";
  params = [
    ip_username,
    ip_first_name,
    ip_last_name,
    ip_address,
    ip_birthdate,
    ip_taxID,
    ip_hired,
    ip_employee_experience,
    ip_salary,
  ];

  db.query(query, params, (err, results) => {
    if (err) {
      console.log("Error executing prodecure: ", err);
      res.status(500).send("Error adding employee.");
    } else {
      res.status(200).send("Employee added successfully");
    }
  });
});

app.post("/add_driver", (req, res) => {
  const { ip_username, ip_licenseID, ip_license_type, ip_driver_experience } =
    req.body;

  if (
    !ip_username ||
    !ip_licenseID ||
    !ip_license_type ||
    !ip_driver_experience
  ) {
    return res.status(400).send("All fields are required");
  }

  const query = "Call add_driver_role(?, ?, ?, ?)";
  params = [ip_username, ip_licenseID, ip_license_type, ip_driver_experience];
  console.log(params);

  db.query(query, params, (err, results) => {
    if (err) {
      console.log("Error executing prodecure: ", err);
      res.status(500).send("Error adding driver.");
    } else {
      res.status(200).send("Driver added successfully");
    }
  });
});

app.post("/add_worker", (req, res) => {
  const { ip_username } = req.body;

  if (!ip_username) {
    return res.status(400).send("All fields are required");
  }

  const query = "Call add_worker_role(?)";
  params = [ip_username];

  db.query(query, params, (err, results) => {
    if (err) {
      console.log("Error executing prodecure: ", err);
      res.status(500).send("Error adding worker.");
    } else {
      res.status(200).send("Worker added successfully");
    }
  });
});

app.post("/add_product", (req, res) => {
  const { ip_barcode, ip_name, ip_weight } = req.body;
  if (!ip_barcode || !ip_name || !ip_weight) {
    res.status(400).send("All fields required");
  }

  const query = "Call add_product(?, ?, ?)";
  params = [ip_barcode, ip_name, ip_weight];

  db.query(query, params, (err, results) => {
    if (err) {
      console.log("Error executing prodecure: ", err);
      res.status(500).send("Error adding product.");
    } else {
      res.status(200).send("Product added successfully");
    }
  });
});

app.post("/add_van", (req, res) => {
  const { ip_id, ip_tag, ip_fuel, ip_capacity, ip_sales, ip_driven_by } =
    req.body;

  if (!ip_id || !ip_tag || !ip_fuel || !ip_capacity || !ip_sales) {
    res.status(400).send("All fields except Driven By is required!");
  }

  const query = "Call add_van(?, ?, ?, ?, ?, ?)";
  params = [ip_id, ip_tag, ip_fuel, ip_capacity, ip_sales, ip_driven_by];

  db.query(query, params, (err, results) => {
    if (err) {
      console.log("Error executing prodecure: ", err);
      res.status(500).send("Error adding van.");
    } else {
      res.status(200).send("Van added successfully");
    }
  });
});

app.post("/add_business", (req, res) => {
  const { ip_long_name, ip_rating, ip_spent, ip_location } = req.body;

  if (!ip_long_name || !ip_rating || !ip_spent || !ip_location) {
    res.status(400).send("All fields are required!");
  }

  const query = "Call add_business(?, ?, ?, ?)";
  params = [ip_long_name, ip_rating, ip_spent, ip_location];

  db.query(query, params, (err, results) => {
    if (err) {
      console.log("Error executing prodecure: ", err);
      res.status(500).send("Error adding business.");
    } else {
      res.status(200).send("Business has been added successfully");
    }
  });
});

app.post("/add_service", (req, res) => {
  const { ip_id, ip_long_name, ip_home_base, ip_manager } = req.body;

  if (!ip_long_name || !ip_id || !ip_home_base) {
    res.status(400).send("All fields except Manager is required!");
  }

  const query = "Call add_service(?, ?, ?, ?)";
  params = [ip_id, ip_long_name, ip_home_base, ip_manager];

  db.query(query, params, (err, results) => {
    if (err) {
      console.log("Error executing prodecure: ", err);
      res.status(500).send("Error adding service.");
    } else {
      res.status(200).send("Service has been added successfully");
    }
  });
});

app.post("/add_location", (req, res) => {
  const { ip_label, ip_x_coord, ip_y_coord, ip_space } = req.body;

  if (!ip_label || !ip_x_coord || !ip_y_coord) {
    res.status(400).send("All fields except Space is required!");
  }

  const query = "Call add_location(?, ?, ?, ?)";
  params = [ip_label, ip_x_coord, ip_y_coord, ip_space];

  db.query(query, params, (err, results) => {
    if (err) {
      console.log("Error executing prodecure: ", err);
      res.status(500).send("Error adding location.");
    } else {
      res.status(200).send("Location has been added successfully");
    }
  });
});

app.get("/get_owners", (req, res) => {
  const query = "SELECT username FROM business_owners";

  db.query(query, (err, results) => {
    if (err) {
      console.log("Error fetching owners: ", err);
      res.status(500).send("Error fetching owners.");
    } else {
      const usernames = results.map((row) => row.username);
      res.status(200).json(usernames);
    }
  });
});

app.get("/get_businesses", (req, res) => {
  const query = "select long_name from businesses";
  db.query(query, (err, results) => {
    if (err) {
      console.log("Error fetching businesses: ", err);
      res.status(500).send("Error fetching businesses.");
    } else {
      const businessNames = results.map((row) => row.long_name);
      res.status(200).json(businessNames);
    }
  });
});

app.post("/start_funding", (req, res) => {
  const { ip_owner, ip_amount, ip_long_name, ip_fund_date } = req.body;
  if (!ip_owner || !ip_long_name || !ip_fund_date) {
    res.status(400).send("Need to fill in all the fields except amount");
  }

  const query = "Call start_funding(?, ?, ?, ?)";
  params = [ip_owner, ip_amount, ip_long_name, ip_fund_date];
  db.query(query, params, (err, results) => {
    if (err) {
      console.log("Error executing prodecure: ", err);
      res.status(500).send("Error funding.");
    } else {
      res.status(200).send("You have started funding successfully");
    }
  });
});

app.post("/hire_employee", (req, res) => {
  const { ip_username, ip_id } = req.body;
  if (!ip_username || !ip_id) {
    res.status(400).send("Need to fill in all the fields!");
  }

  const query = "Call hire_employee(?, ?)";
  params = [ip_username, ip_id];
  db.query(query, params, (err, results) => {
    if (err) {
      console.log("Error executing prodecure: ", err);
      res.status(500).send("Error hiring employee.");
    } else {
      res.status(200).send("You have hired the employee successfully");
    }
  });
});

// Removing from database
app.delete("/fire_employee", (req, res) => {
  const { ip_username, ip_id } = req.body;

  if (!ip_username || !ip_id) {
    res.status(400).send("Both username and ID are required!");
  }

  const query = "Call fire_employee(?, ?)";
  const params = [ip_username, ip_id];

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error executing procedure:", err);
      return res.status(500).send("Error firing employee.");
    }

    res.status(200).send("Employee successfully fired.");
  });
});

app.delete("/remove_product", (req, res) => {
  const { ip_barcode } = req.body;

  if (!ip_barcode) {
    return res.status(400).send("Barcode is required!");
  }

  const query = "Call remove_product(?)";
  const params = [ip_barcode];

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error executing procedure:", err);
      return res.status(500).send("Error removing product.");
    }

    res.status(200).send("Product removed successfully.");
  });
});

app.delete("/remove_van", (req, res) => {
  const { ip_id, ip_tag } = req.body;

  if (!ip_id || !ip_tag) {
    res.status(400).send("Both id and tag are required!");
  }

  const query = "Call remove_van(?, ?)";
  const params = [ip_id, ip_tag];

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error executing procedure:", err);
      return res.status(500).send("Error removing van.");
    }

    res.status(200).send("Van has been removed successfully.");
  });
});

app.delete("/remove_driver", (req, res) => {
  const { ip_username } = req.body;

  if (!ip_username) {
    res.status(400).send("Username is required!");
  }

  const query = "Call remove_driver_role(?)";
  const params = [ip_username];

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error executing procedure:", err);
      return res.status(500).send("Error removing driver.");
    }

    res.status(200).send("Driver has been removed successfully.");
  });
});

// Update rows in database
app.put("/manage_service", (req, res) => {
  const { ip_username, ip_id } = req.body;

  if (!ip_username || !ip_id) {
    return res.status(400).send("Username and ID are required!");
  }

  const query = "Call manage_service(?, ?)";
  params = [ip_username, ip_id];

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error executing procedure:", err);
      return res.status(500).send("Error error managing service.");
    } else {
      res.status(200).send("Managed service successfully.");
    }
  });
});

app.put("/takeover_van", (req, res) => {
  const { ip_username, ip_id, ip_tag } = req.body;

  if (!ip_username || !ip_id) {
    return res.status(400).send("Username and ID are required!");
  }

  const query = "Call takeover_van(?, ?, ?)";
  params = [ip_username, ip_id, ip_tag];

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error executing procedure:", err);
      return res.status(500).send("Error error taking over van.");
    } else {
      res.status(200).send("Successfully taked over van.");
    }
  });
});

app.put("/load_van", (req, res) => {
  const { ip_id, ip_tag, ip_barcode, ip_num_packages, ip_price } = req.body;
  if (!ip_id || !ip_tag || !ip_barcode || !ip_num_packages || !ip_price) {
    return res.status(400).send("All fields are required!");
  }

  const query = "Call load_van(?, ?, ?, ?, ?)";
  params = [ip_id, ip_tag, ip_barcode, ip_num_packages, ip_price];

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error executing procedure:", err);
      return res.status(500).send("Error error loading the van.");
    } else {
      res.status(200).send("Successfully loaded the van.");
    }
  });
});

app.put("/refuel_van", (req, res) => {
  const { ip_id, ip_tag, ip_more_fuel } = req.body;
  if (!ip_id || !ip_tag || !ip_more_fuel) {
    return res.status(400).send("All fields are required!");
  }

  const query = "Call refuel_van(?, ?, ?)";
  params = [ip_id, ip_tag, ip_more_fuel];

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error executing procedure:", err);
      return res.status(500).send("Error error refueling the van.");
    } else {
      res.status(200).send("Successfully refeuled the van.");
    }
  });
});

app.put("/drive_van", (req, res) => {
  const { ip_id, ip_tag, ip_destination } = req.body;
  if (!ip_id || !ip_tag || !ip_destination) {
    return res.status(400).send("All fields are required!");
  }

  const query = "Call drive_van(?, ?, ?)";
  params = [ip_id, ip_tag, ip_destination];

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error executing procedure:", err);
      return res.status(500).send("Error driving the van.");
    } else {
      res.status(200).send("Successfully droving the van.");
    }
  });
});


app.get("/get_products", (req, res) => {
  const query = "SELECT barcode FROM products";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching products: ", err);
      return res.status(500).send("Error fetching products.");
    }
    const product_barcodes = results.map((row) => row.barcode);
    res.status(200).json(product_barcodes);
  });
});

// Get all vans
app.get("/get_vans", (req, res) => {
  const query = "SELECT DISTINCT id FROM vans";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching vans: ", err);
      return res.status(500).send("Error fetching vans.");
    }
    const vanIDs = results.map((row) => row.id);
    res.status(200).json(vanIDs);
  });
});

// Purchase a product
app.put("/purchase_product", (req, res) => {
  const { ip_long_name, ip_id, ip_tag, ip_barcode, ip_quantity } = req.body;

  if (!ip_long_name || !ip_id || !ip_tag || !ip_barcode || !ip_quantity) {
    return res.status(400).send("All fields are required!");
  }

  const query = "CALL purchase_product(?, ?, ?, ?, ?)";
  const params = [ip_long_name, ip_id, ip_tag, ip_barcode, ip_quantity];

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error executing procedure:", err);
      return res.status(500).send("Error purchasing the product.");
    }
    res.status(200).send("Successfully purchased the product.");
  });
});

// Home Page
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
