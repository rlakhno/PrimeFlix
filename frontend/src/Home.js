
import { React, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

function Home() {

  const [name, setName] = useState('');
  const navigate = useNavigate();

  //  Authorization
   useEffect(() => {
    let data = sessionStorage.getItem("valid");
    let name = sessionStorage.getItem("name");
    setName(name);
    if(data === "false" || data === null) {
       navigate('/');
     }
  }, [])

  return (
    <div className="home-container">
      <header className="home-header text-center">
        <div className="overlay">
          <h1 className="display-4">Hi {name}! Welcome to Primflix Video World</h1>
          <p className="lead">Experience the best entertainment with our exclusive subscriptions.</p>
          <div className="d-flex justify-content-center align-items-center">
          <Link to="/videos" className="btn btn-primary btn-lg mt-3">Explore Our Videos</Link>
          </div>
        </div>
      </header>
      <section className="home-products my-5">
        <div className="container">
        <div className='d-flex justify-content-center'><Link to="/store" className="btn btn-primary btn-lg mt-3">Explore Our Products</Link></div>
        <h2 className="text-center mb-4"></h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card">
                <img src="/images/3d-glasses.jpg" className="card-img-top" alt="3D Glasses"/>
                <div className="card-body">
                  <h5 className="card-title">3D Glasses</h5>
                  <p className="card-text">Enhance your 3D experience with our top-quality 3D glasses.</p>
                  <Link to="/products/3d-glasses" className="btn btn-outline-primary">Shop Now</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card">
                <img src="/images/popcorn.jpg" className="card-img-top" alt="Popcorn"/>
                <div className="card-body">
                  <h5 className="card-title">Popcorn</h5>
                  <p className="card-text">Enjoy cinema-style popcorn at home with our special packages.</p>
                  <Link to="/products/popcorn" className="btn btn-outline-primary">Shop Now</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card">
                <img src="/images/camera.jpg" className="card-img-top" alt="Camera"/>
                <div className="card-body">
                  <h5 className="card-title">Cameras</h5>
                  <p className="card-text">Capture your favorite moments with our high-quality cameras.</p>
                  <Link to="/products/cameras" className="btn btn-outline-primary">Shop Now</Link>
                </div>
              </div>
            </div>
            {/* Add more product cards here */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;







// import React from 'react';
// import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Home.css'; // Ensure this path is correct

// function Home() {
//   return (
//     <div className="home-container">
//       <header
//         className="home-header text-center"
//         style={{
//           backgroundImage: "url('/images/3d-cinema.jpg')", // Path is relative to the public folder
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           color: 'white',
//           padding: '4rem 0',
//           marginBottom: '2rem',
//           position: 'relative'
//         }}
//       >
//         <div className="overlay" style={{
//           position: 'relative',
//           zIndex: 1
//         }}>
//           <h1 className="display-4">Welcome to Primflix Video World</h1>
//           <p className="lead">Experience the best entertainment with our exclusive subscriptions.</p>
//           <Link to="/videos" className="btn btn-primary btn-lg mt-3">Explore Videos</Link>
//         </div>
//         <div style={{
//           content: '',
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           background: 'rgba(0, 0, 0, 0.5)',
//           zIndex: 0
//         }}></div>
//       </header>
//       <section className="home-products my-5">
//         <div className="container">
//           <div className='d-flex justify-content-center'><Link to="/store" className="btn btn-primary btn-lg mt-3">Explore Our Products</Link></div>
//         <h2 className="text-center mb-4"></h2>
          
//           <div className="row">
//             <div className="col-md-4 mb-4">
//               <div className="card">
//                 <img src="/images/3d-glasses.jpg" className="card-img-top" alt="3D Glasses"/>
//                 <div className="card-body">
//                   <h5 className="card-title">3D Glasses</h5>
//                   <p className="card-text">Enhance your 3D experience with our top-quality 3D glasses.</p>
//                   <Link to="/products/3d-glasses" className="btn btn-outline-primary">Shop Now</Link>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-4 mb-4">
//               <div className="card">
//                 <img src="/images/popcorn.jpg" className="card-img-top" alt="Popcorn"/>
//                 <div className="card-body">
//                   <h5 className="card-title">Popcorn</h5>
//                   <p className="card-text">Enjoy cinema-style popcorn at home with our special packages.</p>
//                   <Link to="/products/popcorn" className="btn btn-outline-primary">Shop Now</Link>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-4 mb-4">
//               <div className="card">
//                 <img src="/images/camera.jpg" className="card-img-top" alt="Camera"/>
//                 <div className="card-body">
//                   <h5 className="card-title">Cameras</h5>
//                   <p className="card-text">Capture your favorite moments with our high-quality cameras.</p>
//                   <Link to="/products/cameras" className="btn btn-outline-primary">Shop Now</Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Home;
