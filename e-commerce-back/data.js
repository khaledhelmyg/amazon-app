import bcrypt from 'bcryptjs'
const data ={
    users:[
        {
            name:"khaled",
            email:'admin@example.com',
            password:bcrypt.hashSync("123456"),
            isAdmin:true
        },
        {
            name:"sara",
            email:'sara@examole.com',
            password:bcrypt.hashSync("123456"),
            isAdmin:false
        }
    ],
    products: [
        {
            // _id: '1',
            name:"nike skin shirt",
            slug:"nike-skin-shirt",
            category:"Shirts",
            price:10,
            image:"/images/p1.jpg",
            countInStock:10,
            brand:"Nike",
            rating:4.5,
            numReviews:10,
            description: "high quality shirt"
        },
        {
            // _id: '2',
            name:"fire wood skin shirt",
            slug:"fire-wood-skin-shirt",
            category:"Shirts",
            price:10,
            image:"/images/p2.jpg",
            countInStock:10,
            brand:"Fire Wood",
            rating:4.6,
            numReviews:10,
            description: "high quality shirt"
        },
        {
            // _id: '3',
            name:"Zara skin shirt",
            slug:"zara-skin-shirt",
            category:"Shirts",
            price:10,
            image:"/images/p3.jpg",
            countInStock:10,
            brand:"zara",
            rating:4.6,
            numReviews:10,
            description: "high quality shirt"
        },
        {
            // _id: '4',
            name:"vivo skin shirt",
            slug:"vivo-skin-shirt",
            category:"Shirts",
            price:10,
            image:"/images/p4.jpg",
            countInStock:10,
            brand:"Vivo",
            rating:4.6,
            numReviews:10,
            description: "high quality shirt"
        },
    ],
}
export default data