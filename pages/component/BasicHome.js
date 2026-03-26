import React from 'react';
import NormalCard from '../component/NormalCard';

const cards = [
  { id: 1, title: 'Pizza', description: 'Delicious cheesy pizza', image: 'https://cdn.pixabay.com/photo/2017/12/10/14/47/pizza-3010062_1280.jpg', bgColor: '#FCA5A5' },
  { id: 2, title: 'Burger', description: 'Juicy beef burger', image: 'https://cdn.pixabay.com/photo/2019/04/22/08/37/burger-4145977_1280.jpg', bgColor: '#FCD34D' },
  { id: 3, title: 'Pasta', description: 'Creamy Italian pasta', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ38zDZISHMKPQHHC7w29QRSYNjh56WuLKig&s', bgColor: '#6EE7B7' },
  { id: 4, title: 'Tacos', description: 'Spicy Mexican tacos', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuMd2FuzynkuxpIO6vyhskSlbgX1CVKnE6YQ&s', bgColor: '#FDBA74' },
  { id: 5, title: 'Ice Cream', description: 'Cold sweet ice cream', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2omd_565valcMQo3vxS6jmFfjzM5GGKHMfA&s', bgColor: '#A5B4FC' },
  { id: 6, title: 'Sushi', description: 'Fresh sushi rolls', image: 'https://www.sushiya.in/cdn/shop/files/Cucumber_Maki.png?v=1742021465', bgColor: '#F9A8D4' },
  { id: 7, title: 'Salad', description: 'Healthy green salad', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1niPhizUz6SCoFsZsIAoVfRc9hDYC9hj19A&s', bgColor: '#5EEAD4' },
  { id: 8, title: 'Steak', description: 'Grilled steak', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBgayevAKV_FqBDyTYZ5jCb4tUiT0W-nM6xQ&s', bgColor: '#C4B5FD' },
];

const BasicHome = () => {
  return (
    <div 
      className="py-5" 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #d0e6ff 100%)',
      }}
    >
      <div className="container">
        <h1 className="display-4 text-center mb-5" style={{ fontWeight: 700, color: '#343a40' }}>
         New Food Court
        </h1>

        <div className="row g-4 justify-content-center">
          {cards.map((card) => (
            <div 
              key={card.id} 
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
            >
              <div 
                className="w-100 h-100 rounded-4 shadow-sm overflow-hidden"
                style={{ transition: 'transform 0.3s, box-shadow 0.3s' }}
              >
                <NormalCard {...card} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .row > div:hover .card {
          transform: translateY(-8px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default BasicHome;