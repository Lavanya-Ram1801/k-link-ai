from app.meeting_analyzer import analyze_meeting


transcript = """
Manager: We need to finish the API integration by Friday.

Rahul: I can complete the authentication part.

Manager: Good. Please send the updated code before Friday evening.

Priya: I'll test the API once Rahul finishes it.

Manager: Also, we should discuss the deployment issue tomorrow.
"""


print("\n==============================")
print("K-LINK AI MEETING TEST")
print("==============================\n")


result = analyze_meeting(transcript)


print("SUMMARY:")
print(result.get("summary", ""))

print("\nMAIN TOPICS:")
for topic in result.get("main_topics", []):
    print("-", topic)

print("\nDECISIONS:")
for decision in result.get("decisions", []):
    print("-", decision)

print("\nACTION ITEMS:")

for item in result.get("action_items", []):
    print(
        f"- Task: {item.get('task', '')}"
    )
    print(
        f"  Responsible: {item.get('responsible', '')}"
    )
    print(
        f"  Deadline: {item.get('deadline', '')}"
    )

print("\nUNRESOLVED ISSUES:")
for issue in result.get("unresolved_issues", []):
    print("-", issue)

print("\nCOMMUNICATION ISSUES:")
for issue in result.get("communication_issues", []):
    print("-", issue)

print("\nMEETING TONE:")
print(result.get("meeting_tone", ""))

print("\nKEY TAKEAWAYS:")
for takeaway in result.get("key_takeaways", []):
    print("-", takeaway)

print("\n==============================")