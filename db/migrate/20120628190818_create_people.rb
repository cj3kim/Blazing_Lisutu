class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.string :f_name
      t.string :l_name
      t.string :address
      t.string :phone_num

      t.timestamps
    end
  end
end
