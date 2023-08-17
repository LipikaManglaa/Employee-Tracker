const express = require('express');
const inquirer = require('inquirer');

// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;

//connection with database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'employee_db'
    },
    );
  db.connect(function(err) {
    if (err) throw err;
    console.log("succesfully Connected with database!");
  });