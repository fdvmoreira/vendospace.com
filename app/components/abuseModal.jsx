/**
 *
 */

export default function AbuseModal(props) {
  function handleChange(event) {
    console.log(event.taget.valuej);
  }

  function handleReport() {
    console.log("Send report");
  }

  return (
    <div id='reportModal' className='modal fade' role='dialog'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h4 className='modal-title'>Report Abuse</h4>
            <button className='close' data-dismiss='modal'>
              &times;
            </button>
          </div>
          <div className='modal-body'>
            <select className='form-select' onChange={handleChange}>
              <option>Sexual Cotent</option>
              <option>Violent or repulsive content</option>
              <option>Hateful or abusive content</option>
              <option>Harrasment or bullyig</option>
              <option>Harmful or dangerous acts</option>
              <option>Child Abuse</option>
              <option>Infringes my rights</option>
              <option>Promotes terrorism</option>
              <option>Spam or misleading</option>
              <option>Other</option>
            </select>
          </div>
          <div className='modal-footer'>
            <button className='btn btn-outline-secondary' data-dismiss='modal'>
              Cancel
            </button>
            <button className='btn btn-success' onClick={handleReport}>
              Report abuse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
