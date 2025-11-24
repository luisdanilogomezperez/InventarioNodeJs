const excelgenerator = (products, name, res) => {
    const xl = require('excel4node');
    products = products.map((product) => {
        let id = product._id.toString();
        delete product._id;
        product.id = id;
        return {
            id,
            ...product
        };
    })

    let wb = new xl.Workbook();
    let ws = wb.addWorksheet('Inventario');

    // Agregar encabezados
    if (products.length > 0) {
        const headers = Object.keys(products[0]);
        headers.forEach((header, index) => {
            ws.cell(1, index + 1).string(header);
        });
    }
    
    for (let i = 0; i < products.length; i++) {
        const productValues = Object.values(products[i]);
        for (let j = 0; j < productValues.length; j++) {
            let data = productValues[j];
            if (typeof data === 'string') {
                ws.cell(i + 2, j + 1).string(data);
            } else {
                ws.cell(i + 2, j + 1).number(data);
            }
        }
    }

    wb.write(`${name}.xlsx`, res)
 }


 module.exports.ProductsUtil = {
    excelgenerator
 }