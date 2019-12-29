class Tag < ApplicationRecord
  has_and_belongs_to_many :tasks
  validates :tagname, presence: true
end
