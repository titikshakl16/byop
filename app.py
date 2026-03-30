from flask import Flask, render_template, request, jsonify
from travel_ai import generate_plan

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/plan", methods=["POST"])
def plan():
    try:
        data = request.get_json()

        # Debug print (VERY IMPORTANT)
        print("Incoming Data:", data)

        if not data:
            return jsonify({"error": "No JSON received"}), 400

        destination = data.get("destination")
        budget = int(data.get("budget"))
        start_date = data.get("startDate")
        end_date = data.get("endDate")

        result = generate_plan(
            destination,
            budget,
            start_date,
            end_date
        )

        print("Generated Plan:", result)

        return jsonify(result)

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)