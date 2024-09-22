// import React, { lazy, Suspense } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// const Login = lazy(()=>import('../pages/login'))
// const Register = lazy(()=>import('../pages/register'))
// const CreateArticle = lazy(()=>import('../pages/CreateArticle'))
// const Article = lazy(()=>import('../pages/ArticleList'))
// const ArticleDetail = lazy(()=>import('../pages/ArticleDetail'))




// export const MainRouter = () => {
//     return(
//         <Suspense fallback={<div>Loading...</div>}>
//             <Routes>
//                 <Route path="/login" element = {<Login/>}/>
//                 <Route path="/signup" element = {<Register/>}/>
//                 <Route path="/create-article" element = {<CreateArticle/>}/>
//                 <Route path="/dashboard" element = {<Article/>}/>
//                 <Route path="/dashboard/article-details/:id" element = {<ArticleDetail/>}/>
//             </Routes>
//         </Suspense>
//     )

// }




import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from './privateRoutes'; // Adjust the path as needed

const Login = lazy(() => import('../pages/login'));
const Register = lazy(() => import('../pages/register'));
const CreateArticle = lazy(() => import('../pages/CreateArticle'));
const Article = lazy(() => import('../pages/ArticleList'));
const ArticleDetail = lazy(() => import('../pages/ArticleDetail'));

export const MainRouter = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/create-article" element={<PrivateRoute element={<CreateArticle />} />} />
                <Route path="/dashboard" element={<PrivateRoute element={<Article />} />} />
                <Route path="/dashboard/article-details/:id" element={<PrivateRoute element={<ArticleDetail />} />} />
            </Routes>
        </Suspense>
    );
}
