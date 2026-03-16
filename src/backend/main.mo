import List "mo:core/List";
import Nat "mo:core/Nat";



actor {
  public type Result = {
    #ok;
    #err : Text;
  };

  public type OnboardingEntry = {
    schoolName : Text;
    schoolSize : Text;
    contactName : Text;
    contactEmail : Text;
    contactPhone : Text;
    role : Text;
  };

  let onboardingEntries = List.empty<OnboardingEntry>();

  public shared ({ caller }) func submitOnboarding(
    schoolName : Text,
    schoolSize : Text,
    contactName : Text,
    contactEmail : Text,
    contactPhone : Text,
    role : Text,
  ) : async Result {
    let entry : OnboardingEntry = {
      schoolName;
      schoolSize;
      contactName;
      contactEmail;
      contactPhone;
      role;
    };

    onboardingEntries.add(entry);
    #ok;
  };

  public query ({ caller }) func getOnboardingCount() : async Nat {
    onboardingEntries.size();
  };

  public query ({ caller }) func getAllOnboardings() : async [OnboardingEntry] {
    onboardingEntries.toArray();
  };
};
