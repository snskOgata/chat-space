class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user
  mount_uploader :image, ImageUploader

  validates :content, presence: ture, unless: :image?
end
