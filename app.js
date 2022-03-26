const express = require('express');
const http = require('http');
const port = process.env.PORT || 5500

const fs = require('fs');
const path = require('path');

// requiring data
const {Game} = require('./lib/Game');
});

server.listen(port,() => {
  console.log(`Server running at port `+port);
});
