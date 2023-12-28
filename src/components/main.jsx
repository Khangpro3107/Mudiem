const Home = () => {
  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="https://i.ibb.co/MgCXv6n/main-png.jpg"
            alt="Card"
            height={500}
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <h5 className="card-title fs-1 text fw-lighter">
                New Season Arrivals
              </h5>
              <p className="card-text fs-5 d-none d-sm-block ">
                Introducing our New Season Arrivals: Get ready to embark on your
                next journey with the latest travel gadgets designed to enhance
                your travel experience. Discover innovative and practical
                solutions for hassle-free exploration. Upgrade your adventures
                with our new arrivals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
