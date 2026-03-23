import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';

const cards = [
  { id: 1, title: 'Pizza', description: 'Delicious cheesy pizza', image: 'https://cdn.pixabay.com/photo/2017/12/10/14/47/pizza-3010062_1280.jpg', bgColor: '#FCA5A5', ingredients: ['Cheese', 'Tomato Sauce', 'Basil', 'Olive Oil'], price: '$12', rating: 4.5 },
  { id: 2, title: 'Burger', description: 'Juicy beef burger', image: 'https://cdn.pixabay.com/photo/2019/04/22/08/37/burger-4145977_1280.jpg', bgColor: '#FCD34D', ingredients: ['Beef Patty', 'Lettuce', 'Tomato', 'Cheese'], price: '$10', rating: 4.2 },
  { id: 3, title: 'Pasta', description: 'Creamy Italian pasta', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ38zDZISHMKPQHHC7w29QRSYNjh56WuLKig&s', bgColor: '#6EE7B7', ingredients: ['Pasta', 'Cream', 'Parmesan', 'Garlic'], price: '$11', rating: 4.3 },
  { id: 4, title: 'Tacos', description: 'Spicy Mexican tacos', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuMd2FuzynkuxpIO6vyhskSlbgX1CVKnE6YQ&s', bgColor: '#FDBA74', ingredients: ['Tortilla', 'Chicken', 'Salsa', 'Cheese'], price: '$9', rating: 4.1 },
  { id: 5, title: 'Ice Cream', description: 'Cold sweet ice cream', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2omd_565valcMQo3vxS6jmFfjzM5GGKHMfA&s', bgColor: '#A5B4FC', ingredients: ['Milk', 'Sugar', 'Vanilla'], price: '$5', rating: 4.7 },
  { id: 6, title: 'Sushi', description: 'Fresh sushi rolls', image: 'https://www.sushiya.in/cdn/shop/files/Cucumber_Maki.png?v=1742021465', bgColor: '#F9A8D4', ingredients: ['Rice', 'Seaweed', 'Fish'], price: '$14', rating: 4.6 },
  { id: 7, title: 'Salad', description: 'Healthy green salad', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1niPhizUz6SCoFsZsIAoVfRc9hDYC9hj19A&s', bgColor: '#5EEAD4', ingredients: ['Lettuce', 'Tomato', 'Cucumber', 'Olives'], price: '$8', rating: 4.0 },
  { id: 8, title: 'Steak', description: 'Grilled steak', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBgayevAKV_FqBDyTYZ5jCb4tUiT0W-nM6xQ&s', bgColor: '#C4B5FD', ingredients: ['Beef', 'Salt', 'Pepper', 'Herbs'], price: '$18', rating: 4.8 },
];

const BasicDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const card = cards.find((c) => c.id === Number(id));

  if (!card)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'linear-gradient(to right, #f8f9fa, #e9ecef)' }}>
        <p className="text-danger fs-4">Card not found!</p>
      </div>
    );

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to right, #f8f9fa, #d0e6ff)' }} className="py-5">
      <div className="container d-flex justify-content-center">
        <div className="card shadow-lg rounded-4 p-4" style={{ maxWidth: '600px', backgroundColor: card.bgColor }}>
          <img
            src={card.image}
            alt={card.title}
            className="card-img-top rounded-4 mb-4"
            style={{ height: '300px', objectFit: 'cover' }}
          />
          <div className="card-body text-center">
            <h2 className="card-title display-6 fw-bold mb-3">{card.title}</h2>
            <p className="card-text fs-5 mb-3 text-dark">{card.description}</p>

            <hr />

            <div className="text-start mb-3">
              <h5 className="fw-bold">Ingredients:</h5>
              <ul>
                {card.ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-bold fs-5">Price: {card.price}</span>
              <span className="badge bg-success fs-6">⭐ {card.rating}</span>
            </div>

            <Link href="/">
              <a className="btn btn-primary w-100 mt-3">Back to Home</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;