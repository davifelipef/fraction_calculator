window.onload = updateCircleSlices;

function updateCircleSlices() {
    const sliceCount = document.getElementById('sliceCount').value;
    const circle = document.getElementById('circle');
    circle.innerHTML = ""; // Clear any previous slices

    if (sliceCount === "1") {
      const fullCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      fullCircle.setAttribute("cx", "100");
      fullCircle.setAttribute("cy", "100");
      fullCircle.setAttribute("r", "80");
      fullCircle.setAttribute("fill", getColor(8, 3));

      circle.appendChild(fullCircle);
    } else {
      const angle = 360 / sliceCount; // Calculate the angle for each slice

      for (let i = 0; i < sliceCount; i++) {
        const slice = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const startAngle = i * angle;
        const endAngle = (i + 1) * angle;

        slice.setAttribute("d", describeArc(100, 100, 80, startAngle, endAngle));
        slice.setAttribute("fill", getColor(i, sliceCount));

        circle.appendChild(slice);
      }
    }
  }

  function getColor(index, sliceCount) {
    const hue = (360 / sliceCount) * index;
    return 'hsl(' + hue + ', 100%, 50%)';
  }

  // Helper function to describe an arc
  function describeArc(x, y, radius, startAngle, endAngle) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const d = [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      "L", x, y,
      "Z"
    ].join(" ");

    return d;
  }

  // Helper function to convert polar coordinates to Cartesian coordinates
  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

function numberCalc() {
    //console.log("number calc called")
    var user_value = parseFloat(document.getElementById("userValue").value);
    var count_value = parseFloat(document.getElementById("sliceCount").value);
    var result_info = document.getElementById("result");
    if (user_value) {
        var division_result = user_value / count_value;
        result_info.innerHTML = division_result.toFixed(2);
    } else {
        // do nothing
    }
}