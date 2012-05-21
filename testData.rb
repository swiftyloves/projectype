# create users
unless User.find_by_account('g@testUser1')
  User.new(:account => 'testUser1',
           :img => "http://help.twweb.org/wp-content/uploads/2012/05/2084.jpg"
          ).save
end
unless User.find_by_account('g@testUser2')
  User.new(:account => 'testUser2',
           :img => "http://pic.pimg.tw/webosstw/1336663319-2421088193.jpg"
          ).save
end
unless User.find_by_account('g@testUser3')
  User.new(:account => 'testUser3',
           :img => "http://static.ettoday.net/images/85/d85562.jpg"
          ).save
end
unless User.find_by_account('g@testUser4')
  User.new(:account => 'testUser4',
           :img => "http://a5.sphotos.ak.fbcdn.net/hphotos-ak-ash3/582156_10150870157304871_183954419870_9366325_66317856_n.jpg"
          ).save
end
unless User.find_by_account('g@testUser5')
  User.new(:account => 'testUser5',
           :img => "http://pic.wenwen.soso.com/p/20110218/20110218091159-775312496.jpg"
          ).save
end

user1 = User.find_by_account('testUser1')
user2 = User.find_by_account('testUser2')
user3 = User.find_by_account('testUser3')
user4 = User.find_by_account('testUser4')
user5 = User.find_by_account('testUser5')

# user create projects
## if a user have projects with same name, use where() to find
## user1.projects.find_by_name("test1")
if user1.projects.where(:name => "test1").empty?
  user1.projects.create(:name => "test1").save
end
if user1.projects.where(:name => "test2").empty?
  user1.projects.create(:name => "test2").save
end
if user4.projects.where(:name => "test3").empty?
  user4.projects.create(:name => "test3").save
end

proj1 = user1.projects.find_by_name("test1")
proj2 = user1.projects.find_by_name("test2")
proj3 = user4.projects.find_by_name("test3")


# user participate in projects
unless user2.projects.exists?(proj1)
  user2.projects << proj1
end
unless user3.projects.exists?(proj1)
  user3.projects << proj1
end
unless user5.projects.exists?(proj3)
  user5.projects << proj3
end

# project create tasks
if proj1.tasks.where(:name => "test1_task1").empty?
  proj1.tasks.create(:name => "test1_task1", :pos_x => 0, :pos_y => 0).save
end
if proj1.tasks.where(:name => "test1_task2").empty?
  proj1.tasks.create(:name => "test1_task2", :pos_x => 1, :pos_y => 0).save
end
if proj1.tasks.where(:name => "test1_task3").empty?
  proj1.tasks.create(:name => "test1_task3", :pos_x => 0, :pos_y => 1).save
end
if proj1.tasks.where(:name => "test1_task4").empty?
  proj1.tasks.create(:name => "test1_task4", :pos_x => 1, :pos_y => 1).save
end

proj1_task1 = proj1.tasks.find_by_name("test1_task1")
proj1_task2 = proj1.tasks.find_by_name("test1_task2")
proj1_task3 = proj1.tasks.find_by_name("test1_task3")
proj1_task4 = proj1.tasks.find_by_name("test1_task4")

# task create subtasks
if proj1_task1.subtasks.where(:name => "subtask1").empty?
  proj1_task1.subtasks.create(:name => "subtask1",
                              :description => "This is subtask1!!",
                              :sday => "2012-01-01",
                              :dday => "2012-04-01",).save
end
if proj1_task3.subtasks.where(:name => "subtask2").empty?
  proj1_task3.subtasks.create(:name => "subtask2",
                              :description => "This is subtask2!!",
                              :sday => "2012-01-02",
                              :dday => "2012-05-12",).save
end
if proj1_task3.subtasks.where(:name => "subtask3").empty?
  proj1_task3.subtasks.create(:name => "subtask3",
                              :description => "Lalala~~~~",
                              :sday => "2012-05-01",
                              :dday => "2012-06-30",).save
end
if proj1_task3.subtasks.where(:name => "subtask4").empty?
  proj1_task3.subtasks.create(:name => "subtask4",
                              :description => "Orzzzzz~~~~",
                              :sday => "2012-07-01",
                              :dday => "2012-09-01",).save
end

sub1 = proj1_task1.subtasks.find_by_name("subtask1")
sub2 = proj1_task3.subtasks.find_by_name("subtask2")
sub3 = proj1_task3.subtasks.find_by_name("subtask3")
sub4 = proj1_task3.subtasks.find_by_name("subtask4")

# assign subtask to users
unless sub1.users.exists?(user1)
  sub1.users << user1
end
unless sub3.users.exists?(user1)
  sub3.users << user1
end
unless sub3.users.exists?(user2)
  sub3.users << user2
end
unless sub4.users.exists?(user3)
  sub4.users << user3
end

# user comment on task
if user1.comments.where(:subtask_id => sub1.id,
                        :msg => "Why only me!!").empty?
  user1.comments.create(:subtask_id => sub1.id, :msg => "Why only me!!").save
end
if user2.comments.where(:subtask_id => sub2.id,
                        :msg => "la").empty?
  user2.comments.create(:subtask_id => sub2.id, :msg => "la").save
end
if user2.comments.where(:subtask_id => sub2.id,
                        :msg => "lala").empty?
  user2.comments.create(:subtask_id => sub2.id, :msg => "lala").save
end
if user3.comments.where(:subtask_id => sub2.id,
                        :msg => "= =").empty?
  user3.comments.create(:subtask_id => sub2.id, :msg => "= =").save
end

# subtask orders
unless sub4.befores.exists?(sub3)
  sub4.befores << sub3
end
unless sub4.befores.exists?(sub2)
  sub4.befores << sub2
end

###########################################################
# delete example                                          #
###########################################################

# sub1.users.delete(user1)
# proj1.users.delete(user1)
# user1.projects.delete(user1)
#
# or just get a object and destroy it!
# user1.destroy
#
# To reset all data, just destroy all user, other data would be
# deleted automatically.
# User.destroy_all
