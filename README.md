# README
###Ruby version
ruby 2.5.1

## Database design

### usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_name|string|null: false|
|email|string|null: false, unique:true|
|password|string|null: false|
#### Association
- has_many :groups_users
- has_many :groups, through: :groups_users
- has_many :messages

### groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|groups_id|integer|null: false, foreign_key: true|
|users_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

### groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|text|null: false|
#### Association
- has_many :groups_users
- has_many  :users,  through:  :groups_users
- has_many :messages


### messagesテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: true|
|image|string|null: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
#### Association
- belongs_to :user
- belongs_to :group