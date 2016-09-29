contract Device {

    address public owner;
    address actor;
    string public action;
    string public name;
    mapping (address => uint) public actors;
    mapping (string => uint)  levelDefenition;

    address ogOwner;
    address previousOwner;
    

    bool public action_state; 

    
    function Device(string _action, bool _action_state, string _name) {
        owner =  msg.sender;
        levelDefenition["anonymous"] = 0;
        levelDefenition["user"] = 1;
        levelDefenition["admin"] = 2;
        levelDefenition["root"] = 3;
        levelDefenition["system"] = 4;
        levelDefenition["owner"] = 5;
        actors[owner] = levelDefenition["owner"];
        name = _name;
        
        action = _action;
        action_state = _action_state;
    }


    function  setLevel(address _actorAddress, string _level){

        if(actors[msg.sender] >= 2 && levelDefenition[_level] < 5){
            if( actors[msg.sender] >= levelDefenition[_level]){
                actors[_actorAddress] = levelDefenition[_level];
            }
            
        }
    }

    function removeActor(address _actorAddress){

        if(actors[msg.sender] >= 2){
            if(actors[msg.sender] >= actors[_actorAddress]){
                actors[_actorAddress] = 0;
            }
        }
    }

    function setAction(bool _value){

        if(actors[msg.sender] >= 1   ){
            actor = msg.sender;
            action_state = _value;

        }        
    }

    function getAction() returns(bool action_state) {


        return action_state;

    }


    function  transferOwner(address _actorAddress){

        if(actors[msg.sender] == levelDefenition["owner"]){
            actors[_actorAddress] = levelDefenition["owner"];
            actors[msg.sender] = levelDefenition["anonymous"];          
            
        }
    }


     function destroy() { 
        if (msg.sender == owner)
            suicide(owner);  // kills this contract and sends remaining funds back to creator
    }





}
