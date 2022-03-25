const http = require('http');
const port = process.env.PORT || 3001

const fs = require('fs');
const path = require('path');
const express = require('express');
// requiring data
const {Game} = require('./lib/Game');
});

server.listen(port,() => {
  console.log(`Server running at port `+port);
});
