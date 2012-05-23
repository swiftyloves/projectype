# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120522074417) do

  create_table "assigns", :force => true do |t|
    t.integer  "user_id"
    t.integer  "subtask_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "comments", :force => true do |t|
    t.date     "ctime"
    t.text     "msg"
    t.integer  "user_id"
    t.integer  "subtask_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "inviteurls", :force => true do |t|
    t.integer  "project_id"
    t.string   "hashcode"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "participates", :force => true do |t|
    t.integer  "user_id"
    t.integer  "project_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "projects", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "subtaskorders", :force => true do |t|
    t.integer  "subtask_id"
    t.integer  "after_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "subtasks", :force => true do |t|
    t.string   "name"
    t.date     "sday"
    t.date     "dday"
    t.string   "description"
    t.integer  "task_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "tasks", :force => true do |t|
    t.string   "name"
    t.integer  "project_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "pos_x"
    t.integer  "pos_y"
  end

  create_table "users", :force => true do |t|
    t.string   "account"
    t.integer  "sameuser"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "img"
  end

end
