Rails.application.routes.draw do

  namespace "api" do
    namespace "v1" do
      resources :states

      get "vehicles" => "vehicles#index"
      post "vehicles" => "vehicles#create"
      put "vehicles/:id" => "vehicles#update"
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
