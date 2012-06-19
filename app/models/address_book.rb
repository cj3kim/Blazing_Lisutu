class AddressBook < ActiveRecord::Base
  attr_accessible :address, :f_name, :l_name, :phone_num
end
