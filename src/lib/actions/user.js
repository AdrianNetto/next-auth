import { connect } from "../mongodb/mongoose";
import User from "../models/user.model";

export const createOrUpdateUser = async (
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  username
) => {
  try{
    await connect();
  
    const user = await User.findOneAndUpdate(
      {clearkID: id},
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          avatar: image_url,
          email: email_addresses[0].email,
          username: username,
        }
      }, { new: true, upsert: true }
    );

    return user;
  } catch (error) {
    console.error('Error creating or updating user:', error);
  }
}

export const deleteUser = async (id) => {
  try {
    await connect();

    await User.findOneAndDelete({ clerkID: id });
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};