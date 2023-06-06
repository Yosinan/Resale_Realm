<!-- # Resale Realm 

Its an app that enables users to sale and buy secondhand prodcuts for reasonable prices.

## Getting Started

```bash
# fork this project and clone forked repository and cd into it
npm i  # install node modules
# build the API as described in below ERD
npm run test   # test your app if it passes
npm run start
```
[Authors](https://github.com/Yosinan/Resale_Realm/blob/main/AUTHORS)
- Yoseph -> [Github](https://github.com/Yosinan)
- Lidiya -> [Github](https://github.com/Lindagez)
- Esrael -> [Github](https://github.com/esru13)

 -->
 
 <!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css">
    <title>ELY - Resale Realm</title>
    <style>
        
        .home1{
            padding-left: 1cm;
        }
        .title{
            
            text-align: center;
            background-color: #dbe2e0;
        }
       
        .sertabel1{
            
            margin-left: auto;
            margin-right: auto;
            margin-top: auto;
            margin-bottom: auto;
            gap: 100px;
            padding: 1cm;
            border-spacing: 30px;
            
        }
        .tdata{
            color:rgb(247, 242, 242);
            border-radius: 2cm;
            width: 10cm;
            height: 10cm; 
            background-color:rgba(134, 94, 69, 0.935);
            box-shadow: 0 4px 8px 0 rgba(85, 60, 196, 0.967), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }
        .fig{
            text-align: center;
            padding: 0.5cm;  
        }

        .tdata img{
            border-radius: 100%;
            width: 200px;
            height: 200px;
            border: 2px solid #000000;
        }
        .tdata p{
            font-size: 15px;
            font-family: cursive;
            color: #ffffff;
        }
        .tdata:hover{
            background-color: #33363eba;
            color: #000000;
            box-shadow: 0 6px 12px 0 rgba(0, 21, 255, 0.702), 0 6px 20px 0 rgba(10, 102, 50, 0.19);

        }
        .footer{
            
            background-color: #99ffe6;
        }
        .copyr{
            
            background-color: #99ffe6;
            align-items: center;
        }
        #imgs{
            vertical-align: middle;
            width: 200px;
            height: 200px;
            border-radius: 100%;
        }
        .caption{
            text-align: center;
        }
        .captiontxt{
            line-height: 0.5cm;
        
        }
        #btn{
            background-color:#009933;
            font-size: 15px;
            letter-spacing: 1px;
            border-radius: 10px;
            color: #ffffff;
            border-color: #009933;
            padding: 5px 15px;
            display: inline-block;
            margin-left: auto;
            margin-right: 10px;
        }
        #btn:hover{
            background-color:#00e64d;
        }
        #cp{
            text-align: center;
        }
        #cp:hover{
            font-size: 20px;
        }
        h3{
            font-family:cursive;
            color: #000000;
        }
        #txt{
            font-family: cursive;
            color:#660066;
        }

        .social{
            text-align: center;
            padding: 0.5cm;
         }
         .social a{
            text-decoration: none;
            color: #000000;
            font-size: 20px;
            padding: 8px;
         }
         .social:hover a{
            background-color: #137a4c8d;
         }

         .mt-3 {
            align-self: center;

         }

         .copy{
            align-content: center;
            align-self: center;
         }
        

    </style>
    <!-- <link rel="stylesheet" href="App.css"> -->
</head>
<body>
<div class="main">
<div class="home1">
    <p id = "p1"><a href="./HOME.html" target="_top"><img src="./Resources/images/home.jpg" alt="Home Icon" width="30px" height="30px"  > </a> </p>
        </div>
        <div class="title" >
            <h1> Reduce waste and save money with our sustainable resale system powered by the flexible and efficient Resale platform.</h1><br></br>
    <h5>We offer the best product for the most affordable prices</h5><br>
    <button>Get Started</button>
        </div>
        <div class="second">
            <table class = "sertabel1">
                <tr>
            <td class="tdata" id="tdata1">
                <figure class="fig">
                    <img src="./Me.png" alt="profile" class="yos"  width="250cm" height="250cm">
                    <figcaption class="caption"> 
                        <div class="captiontxt">
                            <h3>Yoseph Zewdu</h3>
                            <p>Software Developer</p>
                        <p>He has experience in backend dev and skills in organizing, planning, and leading projects, 
                          and managing project timelines and resources.</p>
                        </div>
                    </figcaption>
                <div class="social" id="social">
                <a href="https://github.com/Yosinan"><i class="fab fa-github" style='font-size:30px'></i></a>
                <a href="https://www.linkedin.com/in/yoseph-zewdu-708048251/"><i class="fab fa-linkedin"></i></a>
                <a href="#"><i class="fab fa-facebook"></i></a>
                <a href="https://twitter.com/Yoseph43810128?t=PFhEPDBa05xTrGG50PkHJw&s=09"><i class="fab fa-twitter"></i></a>
                </div>                  
                    </div>
                </figure>
            </td>
            <td class="tdata" id="tdata2">
                <figure class="fig">
                    <img id = "imgs" src="https://avatars.githubusercontent.com/u/106866923?v=4" width="258cm" height="277cm">
                    <figcaption class="caption"> 
                    <div class="captiontxt">
                        <h3>Lidiya Gezahegn</h3>
                        <p>Software Developer</p>
                        <p> She has prior experience and skills in designing and developing the user interface and experience (UI/UX).</p>
                    </div>
                    </figcaption>
                    <div class="social" id="social">
                    <a href="https://github.com/lindagez"><i class="fab fa-github" style='font-size:30px'></i></a>
                    <a href="https://www.linkedin.com/in/lidiya-gezahegn-9491a9211/"><i class="fab fa-linkedin"></i></a>
                    <a href="#"><i class="fab fa-facebook"></i></a>
                    <a href="https://twitter.com/"><i class="fab fa-twitter"></i></a>
                    </div>            
                        </div>
                    </figure>
            </td>
        
            <td class="tdata" id="tdata3">
                <figure class="fig">
                    <img id = "imgs"  src="https://avatars.githubusercontent.com/u/111453895?v=4" width="258cm" height="277cm">
                    <figcaption class="caption"> 
                        <div class="captiontxt">
                        <h3 >Esrael Berhanu</h3>
                        <p>Software Developer</p>
                        <p>He has expertise in developing and maintaining the server-side, including the database, API, and server-side logic.
                    </div>
                    </figcaption>
                    <div class="social" id="social">
                    <a href="https://github.com/"><i class="fab fa-github" style='font-size:30px'></i></a>
                    <a href="https://www.linkedin.com/in/esrael-berhanu-360ba6248/"><i class="fab fa-linkedin"></i></a>
                    <a href="#"><i class="fab fa-facebook"></i></a>
                    <a href="https://twitter.com/"><i class="fab fa-twitter"></i></a>
                    </div>              
                        </div>
                    </figure>
            </td>
        
            </tr>
            </table>
            <br>
            <br>
        </div>
<footer>
   <p class="copy">Resale Realm @ 2023 All Rights Reserved</p>
</footer>
</section>
</body>
</html>
