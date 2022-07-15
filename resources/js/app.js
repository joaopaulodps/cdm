import React from 'react';
import { render } from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import LogIn from './Pages/Auth/LogIn';
import LogOut from './Pages/Auth/LogOut';
import Home from './Pages/User/Home';
import Authenticated from './components/Role/Authenticated';
import RouteAdmin from './components/Role/RoleAdmin';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminUser from './Pages/Admin/AdminUser/AdminUserDashboard';
import UserCreate from './Pages/Admin/AdminUser/AdminUserCreate';
import UserEdit from './Pages/Admin/AdminUser/AdminUserEdit';
import AboutDashboard from './Pages/Admin/About/AdminAboutDashboard';
import AboutCreate from './Pages/Admin/About/AdminAboutCreate';
import AboutEdit from './Pages/Admin/About/AdminAboutEdit';
import AdminCountry from './Pages/Admin/AdminCountry/AdminCountry';
import AdminCountryEdit from './Pages/Admin/AdminCountry/AdminCountryEdit';
import AdminCountryCreate from './Pages/Admin/AdminCountry/AdminCountryCreate';
import AdminCountryImport from './Pages/Admin/AdminCountry/AdminCountryImport';
import AdminContinent from './Pages/Admin/AdminContinent/AdminContinent';
import AdminContinentCreate from './Pages/Admin/AdminContinent/AdminContinentCreate';
import AdminContinentEdit from './Pages/Admin/AdminContinent/AdminContinentEdit';
import NationsTrophiesEdit from './Pages/Admin/AdminNationalTeamsTrophy/AdminNationalTeamsTrophyEdit';
import NationsTrophiesCreate from './Pages/Admin/AdminNationalTeamsTrophy/AdminNationalTeamsTrophyCreate';
import NationsTrophies from './Pages/Admin/AdminNationalTeamsTrophy/AdminNationalTeamsTrophy';
import NationalTeamEdit from './Pages/Admin/AdminNationalTeam/AdminNationalTeamEdit';
import NationalTeamCreate from './Pages/Admin/AdminNationalTeam/AdminNationalTeamCreate';
import NationalTeam from './Pages/Admin/AdminNationalTeam/AdminNationalTeam';
import TeamTrophy from './Pages/Admin/AdminTeamsTrophy/AdminTeamsTrophy';
import TeamTrophyEdit from './Pages/Admin/AdminTeamsTrophy/AdminTeamsTrophyEdit';
import TeamTrophyCreate from './Pages/Admin/AdminTeamsTrophy/AdminTeamsTrophyCreate';
import TeamEdit from './Pages/Admin/AdminTeam/AdminTeamEdit';
import TeamCreate from './Pages/Admin/AdminTeam/AdminTeamCreate';
import Team from './Pages/Admin/AdminTeam/AdminTeam';
import AdminWorldEdit from './Pages/Admin/AdminWorld/AdminWorldEdit';
import AdminWorldCreate from './Pages/Admin/AdminWorld/AdminWorldCreate';
import AdminWorld from './Pages/Admin/AdminWorld/AdminWorld';
import AdminRegionalEdit from './Pages/Admin/AdminRegional/AdminRegionalEdit';
import AdminRegionalCreate from './Pages/Admin/AdminRegional/AdminRegionalCreate';
import AdminRegional from './Pages/Admin/AdminRegional/AdminRegional';
import AdminTeamTitle from './Pages/Admin/AdminTeamsTitle/AdminTeamTitle';
import AdminTeamTitleCreate from './Pages/Admin/AdminTeamsTitle/AdminTeamTitleCreate';
import AdminTeamTitleEdit from './Pages/Admin/AdminTeamsTitle/AdminTeamTitleEdit';
import AdminNationTitle from './Pages/Admin/AdminNationTitle/AdminNationTitle';
import AdminNationTitleCreate from './Pages/Admin/AdminNationTitle/AdminNationTitleCreate';
import AdminNationTitleEdit from './Pages/Admin/AdminNationTitle/AdminNationTitleEdit';
import AdminPost from './Pages/Admin/SinglePost/SinglePost';
import AdminPostCreate from './Pages/Admin/SinglePost/SinglePostCreate';
import AdminPostEdit from './Pages/Admin/SinglePost/SinglePostEdit';
import AdminCategoryEdit from './Pages/Admin/AdminCategory/AdminCategoryEdit';
import AdminCategoryCreate from './Pages/Admin/AdminCategory/AdminCategoryCreate';
import AdminCategory from './Pages/Admin/AdminCategory/AdminCategory';
import AdminSocialMediaEdit from './Pages/Admin/SocialMedia/SocialMediaEdit';
import AdminSocialMediaCreate from './Pages/Admin/SocialMedia/SocialMediaCreate';
import AdminSocialMedia from './Pages/Admin/SocialMedia/SocialMedia';
import TeamSocialMedia from './Pages/Admin/SocialMedia/SocialMedia';
import PostCategoryEdit from './Pages/Admin/AdminPostCategory/PostCategoryEdit';
import PostCategoryCreate from './Pages/Admin/AdminPostCategory/PostCategoryCreate';
import PostCategory from './Pages/Admin/AdminPostCategory/PostCategory';
import ClubDetails from './Pages/User/ClubDetails';
import CountryDetails from './Pages/User/CountryDetails';
import ContinentDetails from './Pages/User/ContinentDetails';
import UserPosts from './Pages/User/Posts';
import UserSinglePost from './Pages/User/SinglePost';
import PageNotFound from './Pages/NotFound';
import Federations from './Pages/User/Federations';
import FederationDetails from './Pages/User/FederationDetails';
import CountriesList from './Pages/User/Countries';
import CompetitionDetails from './Pages/User/CompetitionDetails';
import NationSocialMediaEdit from './Pages/Admin/SocialMedia/SocialMediaNationEdit';
import NationSocialMediaCreate from './Pages/Admin/SocialMedia/SocialMediaNationCreate';
import NationSocialMedia from './Pages/Admin/SocialMedia/SocialMediaNation';
import About from './Pages/User/About';
import NationalTeamDetails from './Pages/User/NationalTeamDetails';
import TeamsList from './Pages/User/Teams';
import Competitions from './Pages/User/Competitions';

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

 const rootElement = document.getElementById('root');

 render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/">
                <Redirect to="/inicio" />            
            </Route>
            <Authenticated path="/inicio" component={Home}></Authenticated>
            <Authenticated path="/entrar" component={LogIn}></Authenticated>
            <Route path="/sair" component={LogOut}></Route>

            <RouteAdmin exact path="/admin" component={AdminDashboard}></RouteAdmin>
            
            <RouteAdmin path="/admin/usuarios/:id/editar" component={UserEdit}></RouteAdmin>
            <RouteAdmin path="/admin/usuarios/criar" component={UserCreate}></RouteAdmin>
            <RouteAdmin path="/admin/usuarios" component={AdminUser}></RouteAdmin>
            
            <RouteAdmin path="/admin/sobre/:id/editar" component={AboutEdit}></RouteAdmin>
            <RouteAdmin path="/admin/sobre/criar" component={AboutCreate}></RouteAdmin>
            <RouteAdmin path="/admin/sobre" component={AboutDashboard}></RouteAdmin>

            <RouteAdmin path="/admin/paises/:country_id/times/:team_id/titulos/:title_id/editar" component={AdminTeamTitleEdit}></RouteAdmin>
            <RouteAdmin path="/admin/paises/:country_id/times/:team_id/titulos/criar" component={AdminTeamTitleCreate}></RouteAdmin>
            <RouteAdmin path="/admin/paises/:country_id/times/:team_id/titulos" component={AdminTeamTitle}></RouteAdmin>
            
            <RouteAdmin path="/admin/paises/:country_id/times/:team_id/redes-sociais/:media_id/editar" component={AdminSocialMediaEdit}></RouteAdmin>
            <RouteAdmin path="/admin/paises/:country_id/times/:team_id/redes-sociais/criar" component={AdminSocialMediaCreate}></RouteAdmin>
            <RouteAdmin path="/admin/paises/:country_id/times/:team_id/redes-sociais" component={TeamSocialMedia}></RouteAdmin>

            <RouteAdmin path="/admin/paises/:country_id/times/:id/editar" component={TeamEdit}></RouteAdmin>
            <RouteAdmin path="/admin/paises/:country_id/times/criar" component={TeamCreate}></RouteAdmin>
            <RouteAdmin path="/admin/paises/:country_id/times" component={Team}></RouteAdmin>

            <RouteAdmin path="/admin/competicoes-times/:id/editar" component={TeamTrophyEdit}></RouteAdmin>
            <RouteAdmin path="/admin/competicoes-times/criar" component={TeamTrophyCreate}></RouteAdmin>
            <RouteAdmin path="/admin/competicoes-times" component={TeamTrophy}></RouteAdmin>

            <RouteAdmin path="/admin/competicoes-selecoes/:id/editar" component={NationsTrophiesEdit}></RouteAdmin>
            <RouteAdmin path="/admin/competicoes-selecoes/criar" component={NationsTrophiesCreate}></RouteAdmin>
            <RouteAdmin path="/admin/competicoes-selecoes" component={NationsTrophies}></RouteAdmin>

            <RouteAdmin path="/admin/paises/:country_id/selecao/:nation_id/redes-sociais/:media_id/editar" component={NationSocialMediaEdit}></RouteAdmin>
            <RouteAdmin path="/admin/paises/:country_id/selecao/:nation_id/redes-sociais/criar" component={NationSocialMediaCreate}></RouteAdmin>
            <RouteAdmin path="/admin/paises/:country_id/selecao/:nation_id/redes-sociais" component={NationSocialMedia}></RouteAdmin>

            <RouteAdmin path="/admin/paises/:country_id/selecao/:nation_id/titulos/:title_id/editar" component={AdminNationTitleEdit}></RouteAdmin>
            <RouteAdmin path="/admin/paises/:country_id/selecao/:nation_id/titulos/criar" component={AdminNationTitleCreate}></RouteAdmin>
            <RouteAdmin path="/admin/paises/:country_id/selecao/:nation_id/titulos" component={AdminNationTitle}></RouteAdmin>

            <RouteAdmin path="/admin/paises/:country_id/selecao/:id/editar" component={NationalTeamEdit}></RouteAdmin>
            <RouteAdmin path="/admin/paises/:country_id/selecao/criar" component={NationalTeamCreate}></RouteAdmin>
            <RouteAdmin path="/admin/paises/:country_id/selecao" component={NationalTeam}></RouteAdmin>

            <RouteAdmin path="/admin/paises/:id/editar" component={AdminCountryEdit}></RouteAdmin>
            <RouteAdmin path="/admin/paises/criar" component={AdminCountryCreate}></RouteAdmin>
            <RouteAdmin path="/admin/paises/importar" component={AdminCountryImport}></RouteAdmin>
            <RouteAdmin path="/admin/paises" component={AdminCountry}></RouteAdmin>

            <RouteAdmin path="/admin/federacoes-continentais/:id/editar" component={AdminContinentEdit}></RouteAdmin>
            <RouteAdmin path="/admin/federacoes-continentais/criar" component={AdminContinentCreate}></RouteAdmin>
            <RouteAdmin path="/admin/federacoes-continentais" component={AdminContinent}></RouteAdmin>

            <RouteAdmin path="/admin/federacoes-mundiais/:id/editar" component={AdminWorldEdit}></RouteAdmin>
            <RouteAdmin path="/admin/federacoes-mundiais/criar" component={AdminWorldCreate}></RouteAdmin>
            <RouteAdmin path="/admin/federacoes-mundiais" component={AdminWorld}></RouteAdmin>

            <RouteAdmin path="/admin/federacoes-regionais/:id/editar" component={AdminRegionalEdit}></RouteAdmin>
            <RouteAdmin path="/admin/federacoes-regionais/criar" component={AdminRegionalCreate}></RouteAdmin>
            <RouteAdmin path="/admin/federacoes-regionais" component={AdminRegional}></RouteAdmin>

            <RouteAdmin path="/admin/posts/:post_id/categorias/:id/editar" component={PostCategoryEdit}></RouteAdmin>
            <RouteAdmin path="/admin/posts/:post_id/categorias/criar" component={PostCategoryCreate}></RouteAdmin>
            <RouteAdmin path="/admin/posts/:post_id/categorias" component={PostCategory}></RouteAdmin>

            <RouteAdmin path="/admin/posts/:id/editar" component={AdminPostEdit}></RouteAdmin>
            <RouteAdmin path="/admin/posts/criar" component={AdminPostCreate}></RouteAdmin>
            <RouteAdmin path="/admin/posts" component={AdminPost}></RouteAdmin>

            <RouteAdmin path="/admin/categorias/:id/editar" component={AdminCategoryEdit}></RouteAdmin>
            <RouteAdmin path="/admin/categorias/criar" component={AdminCategoryCreate}></RouteAdmin>
            <RouteAdmin path="/admin/categorias" component={AdminCategory}></RouteAdmin>

            {/* Users Routes */}
            <Route path="/posts/id=:post_id" component={UserSinglePost}></Route>
            <Route path="/posts" component={UserPosts}></Route>
            <Route path="/paises/:continent/:country/clubes/:club" component={ClubDetails}></Route>
            <Route path="/paises/:continent/:country/clubes" component={TeamsList}></Route>
            <Route path="/paises/:continent/:country/selecao" component={NationalTeamDetails}></Route>
            <Route path="/paises/:continent/:country" component={CountryDetails}></Route>
            <Route path="/paises/:continent" component={ContinentDetails}></Route>
            <Route path="/paises" component={CountriesList}></Route>
            <Route path="/federacoes/:federation" component={FederationDetails}></Route>
            <Route path="/federacoes" component={Federations}></Route>
            <Route path="/trofeus/:competition" component={CompetitionDetails}></Route>
            <Route path="/trofeus" component={Competitions}></Route>
            <Route path="/sobre" component={About}></Route>
            {/* <Route path="/404" component={PageNotFound} />
            <Redirect to="/404" /> */}
        </Switch>
    </BrowserRouter>,
rootElement
)