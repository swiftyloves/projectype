require 'test_helper'

class TaskControllerTest < ActionController::TestCase
  test "should get taskmode" do
    get :taskmode
    assert_response :success
  end

end
