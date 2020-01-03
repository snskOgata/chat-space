json.array! @users do |user|
  json.user_id user.id
  json._user_name user.name
end