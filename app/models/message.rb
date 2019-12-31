class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :content, presence: ture, unless: :image?
end
