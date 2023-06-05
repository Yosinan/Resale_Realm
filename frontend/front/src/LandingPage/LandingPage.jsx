import React from "react";
 
export function Service(){
    let message ="RESALE REALM"
    return(
      
        <section className="section-white">
            {/* navbar */}
    <nav class="navbar navbar-expand-lg navbar-light bg-warning   py-3 fixed-top">
        <div class="container">
          <a class="navbar-brand" href="#">ELY</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse nav-buttons" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
             
              <li class="nav-item">
                <a class="nav-link" href="./index.html"><i class="fa-solid fa-house"></i>Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"><i class="fa-solid fa-shop"></i>Shop</a>
              </li>
              {/* <li class="nav-item">
                <a class="nav-link" href="#"><i class="fa-solid fa-blog"></i>Blog</a>
              </li> */}
              <li class="nav-item">
                <a class="nav-link" href="#"><i class="fa-solid fa-address-book"></i>Contact Us</a>
              </li>
              <li class="nav-item">
                <i class="fa-solid fa-cart-shopping"></i>
              </li>
              <li class="nav-item">
                <i class="fa-solid fa-user"></i>
              </li>

              
            </ul>
            
          </div>
        </div>
      </nav>
      {/* <!---> */}
      {/* <!-- Home --> */}
        <section id="home">
          <div class="container">
            
            <h1> Reduce waste and save money with our sustainable resale system powered by the flexible and efficient Resale platform.</h1><br></br>
            <h5>We offer the best product for the most affordable prices</h5><br></br>
            <button>Get Started</button>
          </div>
        </section>
           {/* team  */}
            <div className="container">
                <div className="row">

                    <div className="col-md-12 text-center">
                        <h2 className="section-title ">
                             The team portfolio
                        </h2>
                        
                    </div>
                    <div className="col-sm-5 col-md-4 ">
                        <div className="team-item">
                            <img src="https://media.licdn.com/dms/image/D4E03AQFX3c7Rnt4CFA/profile-displayphoto-shrink_200_200/0/1679121909434?e=1691625600&v=beta&t=zkOCKezvmt7hcm_ZnprIsojZS5VY979tPTdH30uw0x8" alt="profile" className="team-item" />
                            <h3>Yoseph Zewdu</h3>
                            <div className="team-info">
                                <p>Software Developer</p>
                                <p>He has experience and skills in organizing, planning, and leading projects, including coordinating the team's efforts, ensuring efficient and effective completion of tasks, and managing project timelines and resources.</p>
                                <div className="sociallinks"></div>
                                    <ul class="icon1" className="team-icon">
                                        <li> <a href="https://github.com/Yosinan" className="github"><i class="fa-brands fa-github"> </i></a></li>
                                    </ul>
                                    <ul class="icon2" className="team-icon">
                                        <li> <a href="https://www.linkedin.com/in/yoseph-zewdu-708048251/" className="linkedin"><i class="fa-brands fa-linkedin"> </i></a></li>
                                    </ul>
                                    <ul className="team-icon">
                                        <li> <a href="#" className="email"><i class="fa-solid fa-envelope"> </i></a></li>
                                    </ul>
                                    
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-sm-6 col-md-4 ">
                        <div className="team-item">
                            <img src="https://avatars.githubusercontent.com/u/106866923?v=4 " alt="profile" className="team-item" />
                            <h3>Lidiya Gezahegn</h3>
                            <div className="team-info">
                                <p>Software Developer</p>
                                <p> She has prior experience and skills in designing and developing the user interface and experience (UI/UX).</p>
                                    <ul className="teamicon">
                                        <li> <a href="https://github.com/lindagez" className="github"><i class="fa-brands fa-github"> </i></a></li>
                                    </ul>
                                    <ul className="teamicon">
                                        <li> <a href="https://www.linkedin.com/in/lidiya-gezahegn-9491a9211/" className="linkedin"><i class="fa-brands fa-linkedin"> </i></a></li>
                                    </ul>
                                    <ul className="teamicon">
                                        <li> <a href="#" className="email"><i class="fa-solid fa-envelope"> </i></a></li>
                                    </ul>
                                    
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 ">
                        <div className="team-item">
                            <img src="https://avatars.githubusercontent.com/u/111453895?v=4" alt="profile" className="team-item" />
                            <h3>Esrael Berhanu</h3>
                            <div className="team-info">
                                <p>Software Developer</p>
                                <p>He has expertise in developing and maintaining the server-side, including the database, API, and server-side logic.
                                        </p>
                                    <ul className="teamicon">
                                        <li> <a href="https://github.com/esru13 " className="github"><i class="fa-brands fa-github"> </i></a></li>
                                    </ul>
                                    <ul className="teamicon">
                                        <li> <a href="https://www.linkedin.com/in/esrael-berhanu-360ba6248/" className="linkedin"><i class="fa-brands fa-linkedin"> </i></a></li>
                                    </ul>
                                    <ul className="teamicon">
                                        <li> <a href="#" className="email"><i class="fa-solid fa-envelope"> </i></a></li>
                                    </ul>
                                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <footer class=" mt-3 py-1">
           <div class="copyright mt-3">
            <div class="row container mx-auto ">
              <div class=" col-lg-4 col-md-5 col-sm-12 mb-1 mx-auto text-nowrap " >
                <p>Resale Realm @ 2023 All Rights Reserved</p>
              </div>
            
            </div>
          </div>
        </footer>
        </section>
        
    )
}
