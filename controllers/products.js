const Product = require('../models/product');

const getAllProducts = async (req, res) => {
  const { company, name, featured, sort, select } = req.query;
  const queryobject = {};
  if (company) {
    queryobject.company = company;
  }
  if (featured) {
    queryobject.featured = featured;
  }
  if (name) {
    queryobject.name = { $regex: name, $options: 'i' };
  }
  let apiData = Product.find(queryobject);
  if (sort) {
    let sortfix = sort.split(',').join(' ');
    apiData = apiData.sort(sortfix);
  }

  if (select) {
    //et selectfix = select.replace(',', ' ');
    let selectfix = select.split(',').join(' ');
    apiData = apiData.select(selectfix);
  }
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;
  let skip = (page - 1) * limit;
  apiData = apiData.skip(skip).limit(limit);

  console.log(queryobject);
  const mydata = await apiData;
  //const mydata = await Product.find({ name: 'iphone' }); //to get specific product
  // const colorize = (text, colorCode) => `\x1b[${colorCode}m${text}\x1b[Om`;
  // const horizontalLine = () => console.log(colorize('='.repeat(40), '36'));
  let htmlContent = ` <html><head><style>
        body{ 
        font-family : Arial, sans-serif;
        } 
        h1{color:#1e90ff;
        }
        table {
          border-collapse: collapse; width:100%}
          th,td{border:1px solid #dddddd; text-align: left; padding:8px;}
          tr:nth-child(even){ 
          background-color:#f2f2f2;
          }
          
        

    </style></head><body>
    <h1>Products</h1>
    <table>
    <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Price</th>
    <th>Rating</th>
    <th>Featured</th>
    <th>Company</th>
    <th>CreatedAt</th>
    </tr>`;
  // htmlContent += '<h1>Products</h1>';
  // htmlContent += '<table>';
  // htmlContent +=
  // '<tr><th>Name</th><th>Price</th><th>Featured</th><th>Company</th></tr>';
  mydata.forEach((product) => {
    htmlContent += `<tr>
    <td>${product._id}</td>

      <td>${product.name}</td>
      <td>$${product.price}</td>
      <td>${product.rating}</td>
      <td>${product.featured ? 'Yes' : 'NO'}</td>
      <td>${product.company}</td>
      <td>${product.createdAt}</td>
      </tr>`;
  });
  htmlContent += '</table></body></html>';
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(htmlContent);
};

const getAllProductsTesting = async (req, res) => {
  const mydata = await Product.find(req.query).select('name company');
  // console.log(req.query);
  let htmlContent = ` <html><head><style>
        body{ 
        font-family : Arial, sans-serif;
        } 
        h1{color:#1e90ff;
        }
        table {
          border-collapse: collapse; width:100%}
          th,td{border:1px solid #dddddd; text-align: left; padding:8px;}
          tr:nth-child(even){ 
          background-color:#f2f2f2;
          }
          
        

    </style></head><body>
    <h1>Product</h1>
    <table>
    <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Price</th>
    <th>Rating</th>
    <th>Featured</th>
    <th>Company</th>
    <th>CreatedAt</th>
    </tr>`;
  // htmlContent += '<h1>Products</h1>';
  // htmlContent += '<table>';
  // htmlContent +=
  //   '<tr><th>Name</th><th>Price</th><th>Featured</th><th>Company</th></tr>';
  mydata.forEach((product) => {
    htmlContent += `<tr>
    <td>${product._id}</td>

      <td>${product.name}</td>
      <td>$${product.price}</td>
      <td>${product.featured ? 'Yes' : 'NO'}</td>
      <td>${product.company}</td>
      <td>${product.createdAt}</td>
      </tr>`;
  });
  htmlContent += '</table></body></html>';
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(htmlContent);
};

//res.status(200).json({ msg: 'I am getAllProductsTesting' });

module.exports = { getAllProducts, getAllProductsTesting };
