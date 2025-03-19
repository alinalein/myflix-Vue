(function(){"use strict";var e={8596:function(e,t,o){var a=o(5130),s=o(6768);function r(e,t,o,a,r,i){const n=(0,s.g2)("AppNavigation"),l=(0,s.g2)("router-view");return(0,s.uX)(),(0,s.CE)(s.FK,null,[(0,s.bF)(n),(0,s.bF)(l)],64)}var i=o(4232);const n={class:"nav"},l={class:"dropdown"},u={class:"dropdown-content"},c=["onClick"];function d(e,t,o,a,r,d){const v=(0,s.g2)("router-link"),m=(0,s.g2)("MovieSearch");return(0,s.uX)(),(0,s.CE)("div",n,[t[8]||(t[8]=(0,s.Lk)("p",null,"myFlix",-1)),(0,s.Lk)("button",{class:"hamburger-menu",onClick:t[0]||(t[0]=(...e)=>d.toggleMenu&&d.toggleMenu(...e))}," ☰ "),(0,s.Lk)("div",{class:(0,i.C4)(["nav-links",{active:r.isMenuOpen}])},[r.isUserLoggedIn?((0,s.uX)(),(0,s.CE)(s.FK,{key:1},[(0,s.bF)(v,{to:"/"},{default:(0,s.k6)((()=>t[4]||(t[4]=[(0,s.eW)("Home")]))),_:1}),(0,s.Lk)("div",l,[t[5]||(t[5]=(0,s.Lk)("div",{class:"dropdown-button"},"Genres ▼",-1)),(0,s.Lk)("div",u,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(r.genres,(e=>((0,s.uX)(),(0,s.CE)("a",{key:e,onClick:t=>d.navigateToGenre(e)},(0,i.v_)(e),9,c)))),128))])]),(0,s.bF)(v,{to:"/fav-movies"},{default:(0,s.k6)((()=>t[6]||(t[6]=[(0,s.eW)("My List")]))),_:1}),(0,s.bF)(m),(0,s.bF)(v,{to:"/profile"},{default:(0,s.k6)((()=>t[7]||(t[7]=[(0,s.eW)("My Profile")]))),_:1}),(0,s.Lk)("a",{onClick:t[1]||(t[1]=(...e)=>d.logout&&d.logout(...e)),ref:""},"Log Out",512)],64)):((0,s.uX)(),(0,s.CE)(s.FK,{key:0},[(0,s.bF)(v,{to:"log-in"},{default:(0,s.k6)((()=>t[2]||(t[2]=[(0,s.eW)("Login")]))),_:1}),(0,s.bF)(v,{to:"sign-up"},{default:(0,s.k6)((()=>t[3]||(t[3]=[(0,s.eW)("Signup")]))),_:1})],64))],2)])}o(4114);const v={class:"search"};function m(e,t,o,r,i,n){return(0,s.uX)(),(0,s.CE)("div",v,[(0,s.bo)((0,s.Lk)("input",{"onUpdate:modelValue":t[0]||(t[0]=e=>i.searchQuery=e),onKeyup:t[1]||(t[1]=(...e)=>n.searchMovies&&n.searchMovies(...e)),placeholder:"Search for movies..."},null,544),[[a.Jo,i.searchQuery]])])}var h={name:"MovieSearch",data(){return{searchQuery:""}},methods:{async searchMovies(){const e="HomePage"===this.$route.name;this.$router[e?"replace":"push"]({name:"HomePage",query:{q:this.searchQuery}})},resetSearchQuery(){"HomePage"!==this.$route.name&&(this.searchQuery="",this.$router.replace({...this.$route,query:{...this.$route.query,q:void 0}}))}},watch:{$route(e,t){e.name!==t.name&&"HomePage"!==e.name&&this.resetSearchQuery()}}},p=o(1241);const g=(0,p.A)(h,[["render",m]]);var f=g,k={name:"AppNavigation",components:{MovieSearch:f},data(){return{isUserLoggedIn:!!localStorage.getItem("user"),selectedGenre:"",isMenuOpen:!1,genres:["Action","Biography","Crime","Drama","Sci-Fi"]}},watch:{$route(){this.isUserLoggedIn=!!localStorage.getItem("user")}},methods:{toggleMenu(){this.isMenuOpen=!this.isMenuOpen},checkUserStatus(){let e=localStorage.getItem("user");this.isUserLoggedIn=!!e},navigateToGenre(e){this.$router.push({name:"GenrePage",params:{genre:e}}),this.isMenuOpen=!1},logout(){localStorage.removeItem("user"),localStorage.removeItem("token"),this.isUserLoggedIn=!1,this.$router.push({name:"LogIn"}),this.isMenuOpen=!1}}};const y=(0,p.A)(k,[["render",d]]);var b=y,L={name:"App",components:{AppNavigation:b}};const M=(0,p.A)(L,[["render",r]]);var S=M;const w={key:0,class:"movies_div movies_view"},_=["src","alt"],C={class:"movie_buttons_div"},I=["onClick"],E=["onClick"],U=["onClick"],F={key:1,class:"movies_view no_result"};function O(e,t,o,a,r,n){const l=(0,s.g2)("MovieDetails");return(0,s.uX)(),(0,s.CE)(s.FK,null,[r.filteredMovies.length?((0,s.uX)(),(0,s.CE)("div",w,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(r.filteredMovies,(e=>((0,s.uX)(),(0,s.CE)("div",{class:"movie-card",key:e.id},[(0,s.Lk)("img",{class:"movie-card__img",src:e.ImagePath,alt:e.Title},null,8,_),(0,s.Lk)("p",null,(0,i.v_)(e.Title),1),(0,s.Lk)("div",C,[(0,s.Lk)("button",{class:"show_button",onClick:t=>n.showMovieDetails(e)}," Show Details ",8,I),n.isFavorite(e._id)?((0,s.uX)(),(0,s.CE)("button",{key:0,class:"fav_button",onClick:t=>n.handleDeleteMovie(e._id)},t[1]||(t[1]=[(0,s.Lk)("i",{class:"fas fa-heart",style:{color:"rgb(229, 9, 20)"}},null,-1)]),8,E)):(0,s.Q3)("",!0),n.isFavorite(e._id)?(0,s.Q3)("",!0):((0,s.uX)(),(0,s.CE)("button",{key:1,class:"fav_button",onClick:t=>n.handleAddMovie(e._id)},t[2]||(t[2]=[(0,s.Lk)("i",{class:"far fa-heart",style:{color:"rgb(229, 9, 20)"}},null,-1)]),8,U))])])))),128))])):r.filteredMovies.length||r.dataFetch?(0,s.Q3)("",!0):((0,s.uX)(),(0,s.CE)("div",F,t[3]||(t[3]=[(0,s.Lk)("p",{style:{color:"white"}},"No results found.",-1)]))),r.selectedMovie?((0,s.uX)(),(0,s.Wv)(l,{key:2,movie:r.selectedMovie,onClose:t[0]||(t[0]=e=>r.selectedMovie=null)},null,8,["movie"])):(0,s.Q3)("",!0)],64)}o(8111),o(2489);const P={key:0,class:"movie-details"},A={class:"details_close"},$=["src","alt"],D={class:"details_details"};function X(e,t,o,a,r,n){return o.movie?((0,s.uX)(),(0,s.CE)("div",P,[(0,s.Lk)("div",A,[(0,s.Lk)("h1",null,(0,i.v_)(o.movie.Title),1),(0,s.Lk)("button",{onClick:t[0]||(t[0]=t=>e.$emit("close"))},"X")]),(0,s.Lk)("img",{src:o.movie.ImagePath,alt:o.movie.Title,class:"movie-details__img"},null,8,$),(0,s.Lk)("div",D,[(0,s.Lk)("p",null,[t[1]||(t[1]=(0,s.Lk)("strong",null,"Director:",-1)),(0,s.eW)(" "+(0,i.v_)(o.movie.Director.Name),1)]),(0,s.Lk)("p",null,[t[2]||(t[2]=(0,s.Lk)("strong",null,"Description:",-1)),(0,s.eW)(" "+(0,i.v_)(o.movie.Description),1)]),(0,s.Lk)("p",null,[t[3]||(t[3]=(0,s.Lk)("strong",null,"Genre:",-1)),(0,s.eW)(" "+(0,i.v_)(o.movie.Genre.Name),1)]),(0,s.Lk)("p",null,[t[4]||(t[4]=(0,s.Lk)("strong",null,"Actors:",-1)),(0,s.eW)(" "+(0,i.v_)(o.movie.Actors.join(", ")),1)])])])):(0,s.Q3)("",!0)}var J={props:{movie:{type:Object,required:!0}}};const N=(0,p.A)(J,[["render",X]]);var B=N,T=o(4373);const q=async e=>{try{let t=JSON.parse(localStorage.getItem("user")),o=localStorage.getItem("token"),a=await T.A.put(`https://movie-api-lina-834bc70d6952.herokuapp.com/users/${t.Username}/movies/add/${e}`,{},{headers:{Authorization:`Bearer ${o}`}});if(200===a.status){const e=JSON.parse(localStorage.getItem("user")),t={...e,...a.data.updatedUser};localStorage.setItem("user",JSON.stringify(t)),alert("movie added to favorites")}}catch(t){console.log("occured error:",t.response),alert("movie could not be added")}},x=async e=>{try{let t=JSON.parse(localStorage.getItem("user")),o=localStorage.getItem("token"),a=await T.A.delete(`https://movie-api-lina-834bc70d6952.herokuapp.com/users/${t.Username}/movies/remove/${e}`,{headers:{Authorization:`Bearer ${o}`}});if(200===a.status){const e=JSON.parse(localStorage.getItem("user")),t={...e,...a.data.updatedUser};localStorage.setItem("user",JSON.stringify(t)),alert("the movie was deleted from the favs")}}catch(t){console.log("occured error:",t.response),alert("Movie could not be deleted")}},Q=async()=>{try{let e=localStorage.getItem("token"),t=await T.A.get("https://movie-api-lina-834bc70d6952.herokuapp.com/movies",{headers:{Authorization:`Bearer ${e}`}});if(200===t.status)return t.data}catch(e){console.error("Error fetching movies:",e.response?e.response.data:e.message),alert("An error occurred while fetching the movies.")}};var W={name:"HomePage",components:{MovieDetails:B},data(){return{movies:[],filteredMovies:[],favorites:[],dataFetch:!0,selectedMovie:null}},watch:{"$route.query.q":{immediate:!0,handler(e){this.filterMovies(e||"")}}},methods:{async handleAddMovie(e){await q(e);const t=JSON.parse(localStorage.getItem("user"));this.favorites=t.FavoriteMovies},async handleDeleteMovie(e){await x(e);const t=JSON.parse(localStorage.getItem("user"));this.favorites=t.FavoriteMovies},isFavorite(e){return this.favorites.includes(e)},async fetchMovies(){this.dataFetch=!0;const e=await Q();e&&(this.movies=e,this.filteredMovies=e),this.dataFetch=!1},filterMovies(e){if(e){const t=e.toLowerCase();this.filteredMovies=this.movies.filter((e=>e.Title.toLowerCase().includes(t)))}else this.filteredMovies=this.movies},showMovieDetails(e){this.selectedMovie=e}},async mounted(){let e=JSON.parse(localStorage.getItem("user"));e?(await this.fetchMovies(),this.filterMovies(this.$route.query.q||""),this.favorites=e.FavoriteMovies||[]):this.$router.push({name:"LogIn"})}};const G=(0,p.A)(W,[["render",O]]);var j=G;const H={class:"background"};function K(e,t,o,r,i,n){const l=(0,s.g2)("router-link");return(0,s.uX)(),(0,s.CE)("div",H,[(0,s.Lk)("div",null,[t[8]||(t[8]=(0,s.Lk)("h1",null,"Login",-1)),(0,s.Lk)("form",{onSubmit:t[2]||(t[2]=(0,a.D$)(((...e)=>n.login&&n.login(...e)),["prevent"])),class:"logIn"},[t[3]||(t[3]=(0,s.Lk)("label",null,"Username:",-1)),(0,s.bo)((0,s.Lk)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>i.username=e),placeholder:"Username",required:""},null,512),[[a.Jo,i.username]]),t[4]||(t[4]=(0,s.Lk)("label",null,"Password:",-1)),(0,s.bo)((0,s.Lk)("input",{type:"password","onUpdate:modelValue":t[1]||(t[1]=e=>i.password=e),placeholder:"Password",required:""},null,512),[[a.Jo,i.password]]),t[5]||(t[5]=(0,s.Lk)("button",{type:"submit"},"Login",-1))],32),(0,s.Lk)("p",null,[t[7]||(t[7]=(0,s.eW)("New to myFlix? ")),(0,s.bF)(l,{class:"redirect_link",to:"/sign-up"},{default:(0,s.k6)((()=>t[6]||(t[6]=[(0,s.eW)("Signup")]))),_:1})])])])}var V={name:"LogIn",data(){return{username:"",password:""}},methods:{async login(){try{let e=await T.A.post("https://movie-api-lina-834bc70d6952.herokuapp.com/users/login",{Username:this.username,Password:this.password},{headers:{"Content-Type":"application/json"}});201===e.status&&(localStorage.setItem("user",JSON.stringify(e.data.user)),localStorage.setItem("token",e.data.token),this.$router.push({name:"HomePage"}))}catch(e){e.response&&400===e.response.status?alert("could not sign in, please check your login credentials"):alert("Unexpected error")}}},mounted(){let e=localStorage.getItem("user"),t=localStorage.getItem("token");e&&t&&this.$router.push({name:"HomePage"})}};const z=(0,p.A)(V,[["render",K]]);var R=z;const Y={class:"update_div"},Z={class:"update_form"};function ee(e,t,o,r,i,n){return(0,s.uX)(),(0,s.CE)("div",Y,[(0,s.Lk)("div",Z,[t[9]||(t[9]=(0,s.Lk)("h1",null,"My Profile Details",-1)),(0,s.Lk)("form",{onSubmit:t[3]||(t[3]=(0,a.D$)(((...e)=>n.updateProfile&&n.updateProfile(...e)),["prevent"])),class:"signUp"},[t[5]||(t[5]=(0,s.Lk)("label",{for:"username"},"Username",-1)),(0,s.bo)((0,s.Lk)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>i.username=e),placeholder:"Username",required:""},null,512),[[a.Jo,i.username]]),t[6]||(t[6]=(0,s.Lk)("label",{for:"username"},"E-Mail",-1)),(0,s.bo)((0,s.Lk)("input",{type:"text","onUpdate:modelValue":t[1]||(t[1]=e=>i.email=e),placeholder:"E-Mail",required:""},null,512),[[a.Jo,i.email]]),t[7]||(t[7]=(0,s.Lk)("label",{for:"Birthday"},"Birthday",-1)),(0,s.bo)((0,s.Lk)("input",{placeholder:"Birthday",type:"date","onUpdate:modelValue":t[2]||(t[2]=e=>i.birthday=e),required:""},null,512),[[a.Jo,i.birthday]]),t[8]||(t[8]=(0,s.Lk)("button",{type:"submit"},"Update Profile",-1))],32),(0,s.Lk)("button",{type:"button",class:"delete_profile",onClick:t[4]||(t[4]=(...e)=>n.deleteProfile&&n.deleteProfile(...e)),style:{"margin-top":"20px"}},"Delete Profile")])])}var te={name:"UserProfile",data(){return{username:"",email:"",birthday:""}},methods:{async updateProfile(){const e=confirm("Are you sure you want to change your details.");if(!e)return;const t=new Date(this.birthday).toISOString().split("T")[0];try{const e=JSON.parse(localStorage.getItem("user")),o=localStorage.getItem("token");let a=await T.A.put(`https://movie-api-lina-834bc70d6952.herokuapp.com/users/update/${e.Username}`,{Username:this.username,Email:this.email,Birthday:t},{headers:{Authorization:`Bearer ${o}`}});if(200===a.status){const t={...e,...a.data};localStorage.setItem("user",JSON.stringify(t)),console.log("udated User",t),this.username=t.Username,this.email=t.Email,this.birthday=t.Birthday.split("T")[0],alert("Profile updated successfully!")}}catch(o){400===o.response?.status?alert("Permission denied"):409===o.response?.status?alert(`${this.username} already exists, please pick another Username.`):(console.error("Error updating profile:",o.response?.data||o.message),alert("Unexpected error occured"))}},async deleteProfile(){const e=confirm("Are you sure you want to delete your profile? This action cannot be undone.");if(e)try{const e=JSON.parse(localStorage.getItem("user")),t=localStorage.getItem("token");let o=await T.A.delete(`https://movie-api-lina-834bc70d6952.herokuapp.com/users/deregister/${e.Username}`,{headers:{Authorization:`Bearer ${t}`}});200===o.status&&(localStorage.removeItem("user"),localStorage.removeItem("token"),this.$router.push({name:"SignUp"}))}catch(t){console.error("Error deleting profile:",t.response?.data||t.message),alert("Profile could not be deleted")}},formatDate(e){if(!e)return"";const t=new Date(e);return t.toLocaleDateString("en-GB")}},mounted(){const e=JSON.parse(localStorage.getItem("user"));if(e&&e.Birthday){const t=new Date(e.Birthday).toISOString().split("T")[0];this.birthday=t}e&&(this.username=e.Username||"",this.email=e.Email||"")}};const oe=(0,p.A)(te,[["render",ee]]);var ae=oe;const se={class:"movies_view"},re={class:"movies_div"},ie=["src","alt"],ne={class:"movie_buttons_div"},le=["onClick"],ue=["onClick"];function ce(e,t,o,a,r,n){const l=(0,s.g2)("MovieDetails");return(0,s.uX)(),(0,s.CE)(s.FK,null,[(0,s.Lk)("div",se,[t[2]||(t[2]=(0,s.Lk)("h1",{class:"fav_title"},"My Favorite Movies",-1)),(0,s.Lk)("div",re,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(r.favMovies,(e=>((0,s.uX)(),(0,s.CE)("div",{class:"movie-card",key:e.id},[(0,s.Lk)("img",{class:"movie-card__img",src:e.ImagePath,alt:e.Title},null,8,ie),(0,s.Lk)("p",null,(0,i.v_)(e.Title),1),(0,s.Lk)("div",ne,[(0,s.Lk)("button",{class:"show_button",onClick:t=>n.showMovieDetails(e)}," Show Details ",8,le),(0,s.Lk)("button",{class:"fav_button",onClick:t=>n.handleDelete(e._id)},t[1]||(t[1]=[(0,s.Lk)("i",{class:"fas fa-heart",style:{color:"rgb(229, 9, 20)"}},null,-1)]),8,ue)])])))),128))])]),r.selectedMovie?((0,s.uX)(),(0,s.Wv)(l,{key:0,movie:r.selectedMovie,onClose:t[0]||(t[0]=e=>r.selectedMovie=null)},null,8,["movie"])):(0,s.Q3)("",!0)],64)}var de={name:"FavMovies",components:{MovieDetails:B},data(){return{movies:[],favMovies:[],selectedMovie:null}},methods:{async fetchMovies(){try{const e=localStorage.getItem("token");let t=await T.A.get("https://movie-api-lina-834bc70d6952.herokuapp.com/movies",{headers:{Authorization:`Bearer ${e}`}});if(200===t.status){this.movies=t.data;let e=JSON.parse(localStorage.getItem("user"));this.favMovies=this.movies.filter((t=>e.FavoriteMovies.includes(t._id))),console.log("favs",this.favMovies),console.log(e)}}catch(e){console.error("Error fetching movies:",e.response?e.response.data:e.message),alert("An error occurred while fetching the movies.")}},async handleDelete(e){try{await x(e),this.favMovies=this.favMovies.filter((t=>t._id!==e))}catch(t){console.error("Error deleting movie:",t.response?.data||t.message)}},showMovieDetails(e){this.selectedMovie=e}},mounted(){this.fetchMovies()}};const ve=(0,p.A)(de,[["render",ce]]);var me=ve;const he={class:"movies_view"},pe={class:"genre_title"},ge={key:0,class:"movies_div"},fe=["src","alt"],ke={class:"movie_buttons_div"},ye=["onClick"],be=["onClick"],Le=["onClick"],Me={key:1,class:"movies_view"};function Se(e,t,o,a,r,n){const l=(0,s.g2)("MovieDetails");return(0,s.uX)(),(0,s.CE)(s.FK,null,[(0,s.Lk)("div",he,[(0,s.Lk)("h1",pe,(0,i.v_)(r.genre)+" Movies",1),r.filteredMovies.length?((0,s.uX)(),(0,s.CE)("div",ge,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(r.filteredMovies,(e=>((0,s.uX)(),(0,s.CE)("div",{class:"movie-card",key:e.id},[(0,s.Lk)("img",{class:"movie-card__img",src:e.ImagePath,alt:e.Title},null,8,fe),(0,s.Lk)("p",null,(0,i.v_)(e.Title),1),(0,s.Lk)("div",ke,[(0,s.Lk)("button",{class:"show_button",onClick:t=>n.showMovieDetails(e)}," Show Details ",8,ye),n.isFavorite(e._id)?((0,s.uX)(),(0,s.CE)("button",{key:0,class:"fav_button",onClick:t=>n.handleDeleteMovie(e._id)},t[1]||(t[1]=[(0,s.Lk)("i",{class:"fas fa-heart",style:{color:"rgb(229, 9, 20)"}},null,-1)]),8,be)):(0,s.Q3)("",!0),n.isFavorite(e._id)?(0,s.Q3)("",!0):((0,s.uX)(),(0,s.CE)("button",{key:1,class:"fav_button",onClick:t=>n.handleAddMovie(e._id)},t[2]||(t[2]=[(0,s.Lk)("i",{class:"far fa-heart",style:{color:"rgb(229, 9, 20)"}},null,-1)]),8,Le))])])))),128))])):((0,s.uX)(),(0,s.CE)("div",Me,t[3]||(t[3]=[(0,s.Lk)("p",null,"No movies found for this genre.",-1)])))]),r.selectedMovie?((0,s.uX)(),(0,s.Wv)(l,{key:0,movie:r.selectedMovie,onClose:t[0]||(t[0]=e=>r.selectedMovie=null)},null,8,["movie"])):(0,s.Q3)("",!0)],64)}var we={name:"GenrePage",components:{MovieDetails:B},data(){return{movies:[],filteredMovies:[],favorites:[],genre:"",selectedMovie:null}},watch:{"$route.params.genre"(e){this.genre=e,this.filterMoviesByGenre()}},methods:{async handleAddMovie(e){await q(e);const t=JSON.parse(localStorage.getItem("user"));this.favorites=t.FavoriteMovies},async handleDeleteMovie(e){await x(e);const t=JSON.parse(localStorage.getItem("user"));this.favorites=t.FavoriteMovies},isFavorite(e){return this.favorites.includes(e)},filterMoviesByGenre(){this.filteredMovies=this.movies.filter((e=>e.Genre?.Name===this.genre))},showMovieDetails(e){this.selectedMovie=e}},async mounted(){this.movies=await Q(),this.genre=this.$route.params.genre,this.filterMoviesByGenre();let e=JSON.parse(localStorage.getItem("user"));e&&(this.favorites=e.FavoriteMovies||[])}};const _e=(0,p.A)(we,[["render",Se]]);var Ce=_e;const Ie={class:"background"};function Ee(e,t,o,r,i,n){const l=(0,s.g2)("router-link");return(0,s.uX)(),(0,s.CE)("div",Ie,[(0,s.Lk)("div",null,[t[13]||(t[13]=(0,s.Lk)("h1",null,"Signup",-1)),(0,s.Lk)("form",{onSubmit:t[4]||(t[4]=(0,a.D$)(((...e)=>n.signup&&n.signup(...e)),["prevent"])),class:"signUp"},[t[5]||(t[5]=(0,s.Lk)("label",null,null,-1)),t[6]||(t[6]=(0,s.Lk)("label",null,"Username, please choose at least 5 characters:",-1)),(0,s.bo)((0,s.Lk)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>i.username=e),placeholder:"Enter Username",required:""},null,512),[[a.Jo,i.username]]),t[7]||(t[7]=(0,s.Lk)("label",null,"Email, please choose at least 8 characters:",-1)),(0,s.bo)((0,s.Lk)("input",{type:"email","onUpdate:modelValue":t[1]||(t[1]=e=>i.email=e),placeholder:"Enter Email",required:""},null,512),[[a.Jo,i.email]]),t[8]||(t[8]=(0,s.Lk)("label",null,"Birthday:",-1)),(0,s.bo)((0,s.Lk)("input",{type:"date","onUpdate:modelValue":t[2]||(t[2]=e=>i.birthday=e),placeholder:"Enter Birthday",required:""},null,512),[[a.Jo,i.birthday]]),t[9]||(t[9]=(0,s.Lk)("label",null,"Password:",-1)),(0,s.bo)((0,s.Lk)("input",{type:"password","onUpdate:modelValue":t[3]||(t[3]=e=>i.password=e),placeholder:"Enter Password",required:""},null,512),[[a.Jo,i.password]]),t[10]||(t[10]=(0,s.Lk)("button",{type:"submit"},"Signup",-1))],32),(0,s.Lk)("p",null,[t[12]||(t[12]=(0,s.eW)("Have an account? ")),(0,s.bF)(l,{class:"redirect_link",to:"/log-in"},{default:(0,s.k6)((()=>t[11]||(t[11]=[(0,s.eW)("Login")]))),_:1})])])])}var Ue={name:"SignUp",data(){return{username:"",email:"",birthday:"",password:""}},methods:{async signup(){try{let e=await T.A.post("https://movie-api-lina-834bc70d6952.herokuapp.com/users/signup",{Username:this.username,Email:this.email,Birthday:this.birthday,Password:this.password},{headers:{"Content-Type":"application/json"}});201===e.status&&(this.$router.push({name:"LogIn"}),alert("Successfully created the user profile"))}catch(e){e.response&&400===e.response.status?alert("could not sign up, please fill out all fields accordingly "):409===e.status?alert("username already exist, please pick another one"):alert("un unexpected error happened")}}},mounted(){let e=localStorage.getItem("user"),t=localStorage.getItem("token");e&&t&&this.$router.push({name:"HomePage"})}};const Fe=(0,p.A)(Ue,[["render",Ee]]);var Oe=Fe,Pe=o(1387);const Ae=[{name:"HomePage",component:j,path:"/"},{name:"SignUp",component:Oe,path:"/sign-up"},{name:"LogIn",component:R,path:"/log-in"},{name:"UserProfile",component:ae,path:"/profile"},{name:"GenrePage",component:Ce,path:"/genre/:genre"},{name:"FavMovies",component:me,path:"/fav-movies"}],$e=(0,Pe.aE)({history:(0,Pe.Bt)(),routes:Ae});var De=$e;(0,a.Ef)(S).use(De).mount("#app")}},t={};function o(a){var s=t[a];if(void 0!==s)return s.exports;var r=t[a]={exports:{}};return e[a].call(r.exports,r,r.exports,o),r.exports}o.m=e,function(){var e=[];o.O=function(t,a,s,r){if(!a){var i=1/0;for(c=0;c<e.length;c++){a=e[c][0],s=e[c][1],r=e[c][2];for(var n=!0,l=0;l<a.length;l++)(!1&r||i>=r)&&Object.keys(o.O).every((function(e){return o.O[e](a[l])}))?a.splice(l--,1):(n=!1,r<i&&(i=r));if(n){e.splice(c--,1);var u=s();void 0!==u&&(t=u)}}return t}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[a,s,r]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var a in t)o.o(t,a)&&!o.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={524:0};o.O.j=function(t){return 0===e[t]};var t=function(t,a){var s,r,i=a[0],n=a[1],l=a[2],u=0;if(i.some((function(t){return 0!==e[t]}))){for(s in n)o.o(n,s)&&(o.m[s]=n[s]);if(l)var c=l(o)}for(t&&t(a);u<i.length;u++)r=i[u],o.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return o.O(c)},a=self["webpackChunkmyflix_vue"]=self["webpackChunkmyflix_vue"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=o.O(void 0,[504],(function(){return o(8596)}));a=o.O(a)})();
//# sourceMappingURL=app.9bd8077f.js.map