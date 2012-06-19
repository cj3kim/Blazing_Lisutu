class CreateAddressBooks < ActiveRecord::Migration
  def change
    create_table :address_books do |t|
      t.string :f_name
      t.string :l_name
      t.string :address
      t.string :phone_num

      t.timestamps
    end
  end
end
