import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation signin($userName: String!, $password: String!) {
    signin(userName: $userName, password: $password) {
      token
      user {
        userName
        firstName
        lastName
        admin
      }
    }
  }
`;

export const ADD_TASK = gql`
  mutation AddTask($input: addTaskInput) {
    addTask(input: $input) {
      id
      createdAt
    }
  }
`;
export const UPDATE_TASK = gql`
  mutation UpdateTask($updateTaskId: ID!, $input: updateTaskInput) {
    updateTask(id: $updateTaskId, input: $input) {
      id
      updatedAt
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($deleteTaskId: ID!) {
    deleteTask(id: $deleteTaskId) {
      message
      success
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($newUser: addUserInput!) {
    addUser(newUser: $newUser) {
      token
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($updateUserId: ID!, $updatedUser: updateUserInput) {
    updateUser(id: $updateUserId, updatedUser: $updatedUser) {
      updatedAt
      id
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      message
      success
    }
  }
`;
