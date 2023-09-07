class CreateVehicles < ActiveRecord::Migration[7.0]
  def change
    create_table :vehicles do |t|
      t.belongs_to :state, foreign_key: true

      t.string :name

      t.timestamps
    end
  end
end
