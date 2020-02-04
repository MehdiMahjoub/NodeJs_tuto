const express = require('express')
const app = express()

// PORT init
const PORT = process.env.PORT || 3000


// Server PORT listen
app.listen(PORT, () => {
    console.log(`Server is runing in port ${PORT}, http://localhost:${PORT}`)
})