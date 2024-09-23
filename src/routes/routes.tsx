import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes here
import PrivateRoute from './privateRoutes'; // Adjust the path as needed

const Login = lazy(() => import('../pages/login'));
const Register = lazy(() => import('../pages/register'));
const CreateArticle = lazy(() => import('../pages/CreateArticle'));
const Article = lazy(() => import('../pages/ArticleList'));
const ArticleDetail = lazy(() => import('../pages/ArticleDetail'));
const MyArticles = lazy(() => import('../pages/myArticles'));
const EditArticle = lazy(() => import('../pages/editArticle'));
const ProfilePage = lazy(() => import('../pages/profile'));

export const MainRouter = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes> {/* Use Routes instead of BrowserRouter */}
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/create-article" element={<PrivateRoute element={<CreateArticle />} />} />
                <Route path="/dashboard" element={<PrivateRoute element={<Article />} />} />
                <Route path="/dashboard/article-details/:id" element={<PrivateRoute element={<ArticleDetail />} />} />
                <Route path="/my-articles" element={<PrivateRoute element={<MyArticles />} />} />
                <Route path="/edit-article/:id" element={<PrivateRoute element={<EditArticle />} />} />
                <Route path="/user-profile" element={<PrivateRoute element={<ProfilePage />} />} />
            </Routes>
        </Suspense>
    );
}





// import  { lazy, Suspense } from "react";
// import { BrowserRouter as  Routes, Route } from "react-router-dom";
// import PrivateRoute from './privateRoutes'; // Adjust the path as needed

// const Login = lazy(() => import('../pages/login'));
// const Register = lazy(() => import('../pages/register'));
// const CreateArticle = lazy(() => import('../pages/CreateArticle'));
// const Article = lazy(() => import('../pages/ArticleList'));
// const ArticleDetail = lazy(() => import('../pages/ArticleDetail'));
// const MyArticles = lazy(() => import('../pages/myArticles'));
// const EditArticle = lazy(() => import('../pages/editArticle'));
// const ProfilePage = lazy(() => import('../pages/profile'));

// export const MainRouter = () => {
//     return (
//         <Suspense fallback={<div>Loading...</div>}>
//             <Routes>
//                 <Route path="/" element={<Login />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/signup" element={<Register />} />
//                 <Route path="/create-article" element={<PrivateRoute element={<CreateArticle />} />} />
//                 <Route path="/dashboard" element={<PrivateRoute element={<Article />} />} />
//                 <Route path="/dashboard/article-details/:id" element={<PrivateRoute element={<ArticleDetail />} />} />
//                 <Route path="/my-articles" element={<PrivateRoute element={<MyArticles />} />} />
//                 <Route path="/edit-article/:id" element={<PrivateRoute element={<EditArticle />} />} />
//                 <Route path="/user-profile" element={<PrivateRoute element={<ProfilePage />} />} />
//             </Routes>
//         </Suspense>
//     );
// }
