Projectype::Application.routes.draw do

  get "task/taskmode"

  # home
  get '/home/' => 'home#index'
  match '/home/ask/:req', :to => 'home#ask'
  match '/home/ask/:req/:acc', :to => 'home#ask'
  get '/home/fblogin' => 'home#fblogin'
  get '/home/logout' => 'home#logout'
  get '/home/gplogin' => 'home#gplogin'
  get '/home/gpcallback' => 'home#gpcallback'

  # test
  get '/test/ajax' => 'home#ajax'
  get '/test/ajaxTest' => 'home#ajaxTest'
  get '/test/ajaxTest2' => 'home#ajaxTest2'

  #project
  get '/project/' => 'project#index'
  get '/project/test' => 'project#test'
  post '/project/add' => 'project#add'
  put '/project/edit' => 'project#edit'
  delete '/project/delete' => 'project#delete'
  get '/project/invite/:hash' => 'project#participate'
  
  # page
  get '/' => 'page#index'
  get '/sel' => 'page#selectable'
  get '/unlogin' => 'page#unlogin'
  get '/invite' => 'page#invite'
  get '/mail' => 'page#mail'
  # TODO: may change method POST
  get '/user' => 'page#user'
  get '/welcome' => 'page#welcome'
  post '/sendmail' => 'page#sendmail'
  # calender
  post '/user/cal' => 'page#cal'
  post '/getEvent' => 'page#getEvent'

  #task
  post '/task' => 'task#taskmode'  

  #hw6
  get '/task/test' => 'task#test'
  post '/task/query' => 'task#query'
  get '/task/loading' => 'task#loading'
  post '/task/savetask' => 'task#savetask' 
  post '/task/deletetask' => 'task#deletetask'
  post '/task/renametask' => 'task#renametask'
  post '/task/ordertask' => 'task#ordertask' 
  post '/task/savesubtask' => 'task#savesubtask'
  post '/task/deletesubtask' => 'task#deletesubtask' 
  post '/task/renamesubtask' => 'task#renamesubtask'
  get '/j_hw6' => 'page#j_hw6'
  post '/usrmode/test' => 'page#usrmode_t'
  post '/usrmode/usub' => 'page#usrsub'
  #subtaskInfo
  get '/subtask/test' => 'subtask#test'
  post '/subtask/query' => 'subtask#query'
  post '/subtask/order' => 'subtask#order'

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
