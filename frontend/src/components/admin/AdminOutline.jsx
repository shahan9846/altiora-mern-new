// "On this page" outline — jump links to each editable section. Static.

const AdminOutline = () => {
  return (
    <nav className="adm-outline" aria-label="Sections on this page">
      <p>On this page</p>
      <ul>
        <li><a href="#hero" className="is-active"><span>Hero</span><em>14</em></a></li>
        <li><a href="#values"><span>Value strip</span><em>10</em></a></li>
        <li><a href="#about"><span>About Altiora</span><em>5</em></a></li>
        <li><a href="#services"><span>Services</span><em>15</em></a></li>
        <li><a href="#why"><span>Why Altiora</span><em>12</em></a></li>
        <li><a href="#approach"><span>Our approach</span><em>11</em></a></li>
        <li><a href="#training"><span>Training programs</span><em>16</em></a></li>
        <li><a href="#cta"><span>Closing banner</span><em>3</em></a></li>
      </ul>
    </nav>
  );
};

export default AdminOutline;
