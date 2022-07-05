import { gql } from "@apollo/client";

export const AUTH_USER = gql`
  query authUser {
    authUser {
      userName
      firstName
      lastName
    }
  }
`;

export const GET_TASKS = gql`
  query Tasks {
    tasks {
      id
      employee
      task
      updatedBy
      updatedAt
    }
  }
`;

export const GET_TASK = gql`
  query Task($taskId: ID!) {
    task(id: $taskId) {
      employee
      task
      updatedBy
      updatedAt
    }
  }
`;

export const GET_USERS = gql`
  query Employee {
    users {
      id
      firstName
      lastName
      userName
      admin
      department
      password
    }
  }
`;

export const GET_USER = gql`
  query Employee($userId: ID!) {
    user(id: $userId) {
      id
      firstName
      lastName
      userName
      department
      admin
    }
  }
`;
