const Index = () => {
  return <div>new listing</div>;
};

async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default Index;

/** Listing
 * _id,
 * space,
 * user,
 * status,
 * timestamp
 *
 */

/** Auction
 * _id
 * start
 * end
 * User
 * Space
 * Initial Price
 * Status
 * Timestamp
 */
