class CreateStates < ActiveRecord::Migration[7.0]
  def change
    create_table :states do |t|
      t.string :name
      t.string :alias
      t.string :main_model_name
      t.integer :order

      t.timestamps
    end
  end
end
