import { GetPostsQuery, GetPostsQueryVariables } from '@/queries/getAllPosts.generated';
import { gql, TypedDocumentNode } from '@apollo/client';

export const GET_ALL_POSTS: TypedDocumentNode<GetPostsQuery, GetPostsQueryVariables> = gql`
  query getPosts(
    $endCursorPostId: Int
    $searchTerm: String
    $pageSize: Int = 10
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
  ) {
    getPosts(
      pageSize: $pageSize
      endCursorPostId: $endCursorPostId
      sortBy: $sortBy
      sortDirection: $sortDirection
      searchTerm: $searchTerm
    ) {
      pagesCount
      pageSize
      totalCount
      items {
        images {
          id
          createdAt
          url
          width
          height
          fileSize
        }
        id
        ownerId
        description
        createdAt
        updatedAt
        postOwner {
          id
          userName
          firstName
          lastName
          avatars {
            url
            width
            height
            fileSize
          }
        }
        userBan {
          reason
          createdAt
        }
      }
    }
  }
`;
