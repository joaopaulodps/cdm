<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login',[App\Http\Controllers\Auth\Api\AuthController::class, 'login'])->name('login');
Route::post('/auth/me',[App\Http\Controllers\Auth\Api\AuthController::class, 'me'])->name('auth.me');
Route::post('/auth/refresh',[App\Http\Controllers\Auth\Api\AuthController::class, 'refresh'])->name('auth.refresh');
Route::post('/auth/logout',[App\Http\Controllers\Auth\Api\AuthController::class, 'logout'])->name('auth.logout');

Route::prefix('admin')->middleware('admin')->group(function(){
    //Profile
    Route::get('profile',[App\Http\Controllers\Admin\UserController::class, 'profile']);
    Route::post('profile/update',[App\Http\Controllers\Admin\UserController::class, 'updateProfile']);

    //Clubes do Mundo users
    Route::get('user',[App\Http\Controllers\Admin\UserController::class, 'index']);
    Route::post('user/store',[App\Http\Controllers\Admin\UserController::class, 'store']);
    Route::get('user/{user_id}/edit',[App\Http\Controllers\Admin\UserController::class, 'edit']);
    Route::post('user/{user_id}/update',[App\Http\Controllers\Admin\UserController::class, 'update']);
    Route::post('user/{user_id}/delete',[App\Http\Controllers\Admin\UserController::class, 'delete']);

    //About
    Route::get('about', [App\Http\Controllers\Admin\AboutController::class, 'index']);
    Route::post('about/store', [App\Http\Controllers\Admin\AboutController::class, 'store']);
    Route::get('about/{about_id}/edit', [App\Http\Controllers\Admin\AboutController::class, 'edit']);
    Route::post('about/{about_id}/update', [App\Http\Controllers\Admin\AboutController::class, 'update']);
    Route::post('about/{about_id}/delete', [App\Http\Controllers\Admin\AboutController::class, 'delete']);

    //Images
    Route::get('image', [App\Http\Controllers\Admin\ImageController::class, 'index']);
    Route::post('image/store', [App\Http\Controllers\Admin\ImageController::class, 'store']);
    Route::get('image/{image_id}/edit', [App\Http\Controllers\Admin\ImageController::class, 'edit']);
    Route::post('image/{image_id}/update', [App\Http\Controllers\Admin\ImageController::class, 'update']);
    Route::post('image/{image_id}/delete', [App\Http\Controllers\Admin\ImageController::class, 'delete']);

    //World
    Route::get('world', [App\Http\Controllers\Admin\WorldFederationController::class, 'index']);
    Route::post('world/store', [App\Http\Controllers\Admin\WorldFederationController::class, 'store']);
    Route::get('world/{world_id}/edit', [App\Http\Controllers\Admin\WorldFederationController::class, 'edit']);
    Route::post('world/{world_id}/update', [App\Http\Controllers\Admin\WorldFederationController::class, 'update']);
    Route::post('world/{world_id}/delete', [App\Http\Controllers\Admin\WorldFederationController::class, 'delete']);

    //Continents
    Route::get('continent', [App\Http\Controllers\Admin\ContinentController::class, 'index']);
    Route::post('continent/store', [App\Http\Controllers\Admin\ContinentController::class, 'store']);
    Route::get('continent/{continent_id}/edit', [App\Http\Controllers\Admin\ContinentController::class, 'edit']);
    Route::post('continent/{continent_id}/update', [App\Http\Controllers\Admin\ContinentController::class, 'update']);
    Route::post('continent/{continent_id}/delete', [App\Http\Controllers\Admin\ContinentController::class, 'delete']);

    //Countries
    Route::get('country/index', [App\Http\Controllers\Admin\CountryController::class, 'index']);
    Route::get('country/{continent_id}/index', [App\Http\Controllers\Admin\CountryController::class, 'selectCountries']);
    Route::post('country/store', [App\Http\Controllers\Admin\CountryController::class, 'store']);
    Route::get('country/{country_id}/edit', [App\Http\Controllers\Admin\CountryController::class, 'edit']);
    Route::post('country/{country_id}/update', [App\Http\Controllers\Admin\CountryController::class, 'update']);
    Route::post('country/{country_id}/delete', [App\Http\Controllers\Admin\CountryController::class, 'delete']);
    Route::post('country/import',[App\Http\Controllers\Admin\CountryController::class, 'import']);

    //Teams
    Route::get('team/{country_id}/index', [App\Http\Controllers\Admin\TeamController::class, 'index']);
    Route::post('team/store', [App\Http\Controllers\Admin\TeamController::class, 'store']);
    Route::get('team/{team_id}/edit', [App\Http\Controllers\Admin\TeamController::class, 'edit']);
    Route::post('team/{team_id}/update', [App\Http\Controllers\Admin\TeamController::class, 'update']);
    Route::post('team/{team_id}/delete', [App\Http\Controllers\Admin\TeamController::class, 'delete']);
    Route::post('team/import',[App\Http\Controllers\Admin\TeamController::class, 'import']);

    //National Teams
    Route::get('national-team/{country_id}/index', [App\Http\Controllers\Admin\NationalTeamController::class, 'index']);
    Route::post('national-team/store', [App\Http\Controllers\Admin\NationalTeamController::class, 'store']);
    Route::get('national-team/{team_id}/edit', [App\Http\Controllers\Admin\NationalTeamController::class, 'edit']);
    Route::post('national-team/{team_id}/update', [App\Http\Controllers\Admin\NationalTeamController::class, 'update']);
    Route::post('national-team/{team_id}/delete', [App\Http\Controllers\Admin\NationalTeamController::class, 'delete']);

    //National Teams Competitions
    Route::get('nations-competitions/index', [App\Http\Controllers\Admin\NationalTeamTrophyController::class, 'index']);
    Route::post('nations-competitions/store', [App\Http\Controllers\Admin\NationalTeamTrophyController::class, 'store']);
    Route::get('nations-competitions/{competition_id}/edit', [App\Http\Controllers\Admin\NationalTeamTrophyController::class, 'edit']);
    Route::post('nations-competitions/{competition_id}/update', [App\Http\Controllers\Admin\NationalTeamTrophyController::class, 'update']);
    Route::post('nations-competitions/{competition_id}/delete', [App\Http\Controllers\Admin\NationalTeamTrophyController::class, 'delete']);

    //Teams Competitions
    Route::get('teams-competitions/index', [App\Http\Controllers\Admin\TeamTrophyController::class, 'index']);
    Route::post('teams-competitions/store', [App\Http\Controllers\Admin\TeamTrophyController::class, 'store']);
    Route::get('teams-competitions/{competition_id}/edit', [App\Http\Controllers\Admin\TeamTrophyController::class, 'edit']);
    Route::post('teams-competitions/{competition_id}/update', [App\Http\Controllers\Admin\TeamTrophyController::class, 'update']);
    Route::post('teams-competitions/{competition_id}/delete', [App\Http\Controllers\Admin\TeamTrophyController::class, 'delete']);

    //Regional Federations
    Route::get('regional/index', [App\Http\Controllers\Admin\RegionalFederationController::class, 'index']);
    Route::post('regional/store', [App\Http\Controllers\Admin\RegionalFederationController::class, 'store']);
    Route::get('regional/{regional_id}/edit', [App\Http\Controllers\Admin\RegionalFederationController::class, 'edit']);
    Route::post('regional/{regional_id}/update', [App\Http\Controllers\Admin\RegionalFederationController::class, 'update']);
    Route::post('regional/{regional_id}/delete', [App\Http\Controllers\Admin\RegionalFederationController::class, 'delete']);

    //National Teams Titles
    Route::get('nations-titles/{nation_id}/index', [App\Http\Controllers\Admin\NationTitleController::class, 'index']);
    Route::post('nations-titles/store', [App\Http\Controllers\Admin\NationTitleController::class, 'store']);
    Route::get('nations-titles/{title_id}/edit', [App\Http\Controllers\Admin\NationTitleController::class, 'edit']);
    Route::post('nations-titles/{title_id}/update', [App\Http\Controllers\Admin\NationTitleController::class, 'update']);
    Route::post('nations-titles/{title_id}/delete', [App\Http\Controllers\Admin\NationTitleController::class, 'delete']);

    //Teams Titles
    Route::get('teams-titles/{team_id}/index', [App\Http\Controllers\Admin\TeamTitleController::class, 'index']);
    Route::post('teams-titles/store', [App\Http\Controllers\Admin\TeamTitleController::class, 'store']);
    Route::get('teams-titles/{title_id}/edit', [App\Http\Controllers\Admin\TeamTitleController::class, 'edit']);
    Route::post('teams-titles/{title_id}/update', [App\Http\Controllers\Admin\TeamTitleController::class, 'update']);
    Route::post('teams-titles/{title_id}/delete', [App\Http\Controllers\Admin\TeamTitleController::class, 'delete']);

    //Single Posts
    Route::get('single-posts/index', [App\Http\Controllers\Admin\SinglePostController::class, 'index']);
    Route::post('single-posts/store', [App\Http\Controllers\Admin\SinglePostController::class, 'store']);
    Route::get('single-posts/{post_id}/edit', [App\Http\Controllers\Admin\SinglePostController::class, 'edit']);
    Route::post('single-posts/{post_id}/update', [App\Http\Controllers\Admin\SinglePostController::class, 'update']);
    Route::post('single-posts/{post_id}/delete', [App\Http\Controllers\Admin\SinglePostController::class, 'delete']);

    //Social Medias
    Route::get('social_media/{team_id}/index', [App\Http\Controllers\Admin\SocialMediaController::class, 'indexTeam']);
    Route::post('social_media/store', [App\Http\Controllers\Admin\SocialMediaController::class, 'storeTeam']);
    Route::get('social_media/{social_media_id}/edit', [App\Http\Controllers\Admin\SocialMediaController::class, 'edit']);
    Route::post('social_media/{social_media_id}/update', [App\Http\Controllers\Admin\SocialMediaController::class, 'update']);
    Route::post('social_media/{social_media_id}/delete', [App\Http\Controllers\Admin\SocialMediaController::class, 'delete']);
    Route::get('social_media/{nation_id}/indexNation', [App\Http\Controllers\Admin\SocialMediaController::class, 'indexNation']);
    Route::post('social_media/storeNation', [App\Http\Controllers\Admin\SocialMediaController::class, 'storeNation']);
    
    //Category
    Route::get('category/index', [App\Http\Controllers\Admin\PostCategoryController::class, 'index']);
    Route::post('category/store', [App\Http\Controllers\Admin\PostCategoryController::class, 'store']);
    Route::get('category/{category_id}/edit', [App\Http\Controllers\Admin\PostCategoryController::class, 'edit']);
    Route::post('category/{category_id}/update', [App\Http\Controllers\Admin\PostCategoryController::class, 'update']);
    Route::post('category/{category_id}/delete', [App\Http\Controllers\Admin\PostCategoryController::class, 'delete']);

    //Category Post
    Route::get('category/{post_id}/index', [App\Http\Controllers\Admin\CategoryController::class, 'index']);
    Route::post('category/{post_id}/store', [App\Http\Controllers\Admin\CategoryController::class, 'store']);
    Route::get('category-post/{category_id}/edit', [App\Http\Controllers\Admin\CategoryController::class, 'edit']);
    Route::post('category-post/{category_id}/update', [App\Http\Controllers\Admin\CategoryController::class, 'update']);
    Route::post('category-post/{category_id}/delete', [App\Http\Controllers\Admin\CategoryController::class, 'delete']);

});

Route::get('top-countries/index', [App\Http\Controllers\User\HomeController::class, 'indexCountries']);
/* Route::get('countries', [App\Http\Controllers\User\CountryController]) */
Route::get('posts/index', [App\Http\Controllers\User\HomeController::class, 'indexPosts']);
Route::get('clubs/index', [App\Http\Controllers\User\HomeController::class, 'indexClubs']);
Route::get('{continent}/countries/index', [App\Http\Controllers\User\CountryController::class, 'index']);
Route::get('{country}/index', [App\Http\Controllers\User\CountryController::class, 'indexCountry']);
Route::get('titles/{country}/index', [App\Http\Controllers\User\CountryController::class, 'indexTitles']);
Route::get('national-team/{country}/index', [App\Http\Controllers\User\NationalTeamController::class, 'index']);
Route::get('team/{country}/index', [App\Http\Controllers\User\TeamController::class, 'index']);
Route::get('post/{post_id}', [App\Http\Controllers\User\PostController::class, 'indexPost']);
Route::get('post', [App\Http\Controllers\User\PostController::class, 'index']);
Route::get('about', [App\Http\Controllers\User\FooterController::class, 'index']);
Route::get('federations', [App\Http\Controllers\User\FederationController::class, 'index']);
Route::get('federations/{fed}', [App\Http\Controllers\User\FederationController::class, 'indexContinental']);
Route::get('federations/regional', [App\Http\Controllers\User\FederationController::class, 'indexRegional']);
Route::get('competitions', [App\Http\Controllers\User\CompetitionController::class, 'index']);
Route::get('competition/{name}/details', [App\Http\Controllers\User\CompetitionController::class, 'indexTeam']);
/* Route::get('competition/nation/{name}/details', [App\Http\Controllers\User\CompetitionController::class, 'indexNation']); */
Route::get('team/{name}/indexTeam', [App\Http\Controllers\User\TeamController::class, 'indexTeam']);